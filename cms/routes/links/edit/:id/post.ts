import type { Request, Response } from "express";

const parseField = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const parseId = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
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

    res.redirect("/cms/links?message=successEdit");
  } catch (error) {
    console.error("Failed to update link", error);
    res.status(500).send("Failed to update link");
  }
};
