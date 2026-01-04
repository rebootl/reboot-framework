import type { DatabaseSync } from "node:sqlite";
import type { Request, Response } from "express";

const parseField = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const parseId = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const parseSelectedTagIds = (value: unknown): number[] => {
  if (value === undefined || value === null) {
    return [];
  }
  const values = Array.isArray(value) ? value : [value];
  const parsedIds = values
    .map((item) => Number(item))
    .filter(
      (id): id is number => Number.isFinite(id) && Number.isInteger(id) && id > 0,
    );
  return [...new Set(parsedIds)];
};

const updateLinkTags = (
  db: DatabaseSync,
  linkId: number,
  selectedTagIds: number[],
) => {
  const existingStmt = db.prepare("SELECT tag_id FROM link_to_tag WHERE link_id = ?");
  const deleteStmt = db.prepare(
    "DELETE FROM link_to_tag WHERE link_id = ? AND tag_id = ?",
  );
  const insertStmt = db.prepare(
    "INSERT INTO link_to_tag (link_id, tag_id) VALUES (?, ?)",
  );

  const existingRows = existingStmt.all(linkId) as Array<{ tag_id: number }>;
  const existingTagIds = existingRows
    .map((row) => Number(row.tag_id))
    .filter((id) => Number.isFinite(id) && Number.isInteger(id));

  const selectedSet = new Set(selectedTagIds);
  const existingSet = new Set(existingTagIds);

  for (const tagId of existingSet) {
    if (!selectedSet.has(tagId)) {
      deleteStmt.run(linkId, tagId);
    }
  }

  for (const tagId of selectedTagIds) {
    if (!existingSet.has(tagId)) {
      insertStmt.run(linkId, tagId);
    }
  }
};

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const id = parseId(req.params.id);
  if (id === null) {
    res.status(400).send("Invalid link id");
    return;
  }

  const title = parseField(req.body.title);
  const url = parseField(req.body.url);
  if (!title || !url) {
    res.status(400).send("Title and URL are required");
    return;
  }

  const comment = parseField(req.body.comment);
  const selectedTagIds = parseSelectedTagIds(req.body.tags);

  try {
    const existsStmt = req.db.prepare("SELECT id FROM links WHERE id = ? LIMIT 1");
    const existing = existsStmt.get(id);
    if (!existing) {
      res.status(404).send("Link not found");
      return;
    }

    const updateStmt = req.db.prepare(
      "UPDATE links SET title = ?, url = ?, comment = ?, modified_at = ? WHERE id = ?",
    );
    updateStmt.run(title, url, comment, new Date().toISOString(), id);

    updateLinkTags(req.db, id, selectedTagIds);

    res.redirect("/cms/links?message=successEdit");
  } catch (error) {
    console.error("Failed to update link", error);
    res.status(500).send("Failed to update link");
  }
};
