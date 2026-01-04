import type { Request, Response } from "express";

import baseTemplate from "../../../../templates/base.ts";
import editLinkTemplate from "./template.ts";

function fetchTags(req: Request) {
  try {
    const stmt = req.db.prepare(
      "SELECT id, name FROM link_tags ORDER BY name ASC",
    );
    const rows = stmt.all();
    return rows.map((row) => ({
      id: Number(row.id),
      name: String(row.name || ""),
      selected: false,
    }));
  } catch (error) {
    console.error("Failed to fetch tags", error);
    return [];
  }
}

function fetchSelectedTags(req: Request, linkId: number) {
  try {
    const stmt = req.db.prepare(
      "SELECT tag_id FROM link_to_tag WHERE link_id = ?",
    );
    const rows = stmt.all(linkId);
    return rows.map((row) => Number(row.tag_id));
  } catch (error) {
    console.error("Failed to fetch selected tags", error);
    return [];
  }
}

function fetchLink(req: Request, id: number) {
  try {
    const stmt = req.db.prepare(
      "SELECT id, title, url, comment FROM links WHERE id = ?",
    );
    const row = stmt.get(id);
    if (row) {
      return {
        id: Number(row.id),
        title: String(row.title || ""),
        url: String(row.url || ""),
        comment: String(row.comment || ""),
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch link", error);
    return null;
  }
}

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).send("Invalid link id");
    return;
  }

  const link = fetchLink(req, id);
  if (!link) {
    res.status(404).send("Link not found");
    return;
  }

  const tags = fetchTags(req);
  const selectedTagIds = fetchSelectedTags(req, id);
  for (const tag of tags) {
    tag.selected = selectedTagIds.includes(tag.id);
  }

  const content = editLinkTemplate(
    link,
    tags,
  );
  const html = baseTemplate(content, req);
  res.send(html);
};
