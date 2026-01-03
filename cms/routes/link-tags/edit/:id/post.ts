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
    res.status(400).send("Invalid tag id");
    return;
  }

  const name = parseField(req.body.name);
  if (!name) {
    res.status(400).send("Name is required");
    return;
  }

  const color = parseField(req.body.color);

  try {
    const existsStmt = req.db.prepare("SELECT id FROM link_tags WHERE id = ? LIMIT 1");
    const existing = existsStmt.get(id);
    if (!existing) {
      res.status(404).send("Link tag not found");
      return;
    }

    const updateStmt = req.db.prepare("UPDATE link_tags SET name = ?, color = ? WHERE id = ?");
    updateStmt.run(name, color, id);

    res.redirect("/cms/link-tags?message=successEdit");
  } catch (error) {
    console.error("Failed to update link tag", error);
    res.status(500).send("Failed to update link tag");
  }
};
