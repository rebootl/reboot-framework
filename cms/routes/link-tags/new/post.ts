import type { Request, Response } from "express";

const parseField = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const name = parseField(req.body.name);
  if (!name) {
    res.status(400).send("Name is required");
    return;
  }

  const color = parseField(req.body.color);

  try {
    const stmt = req.db.prepare(
      "INSERT INTO link_tags (name, color) VALUES (?, ?)",
    );
    stmt.run(name, color);
    res.redirect("/cms/link-tags?message=successCreate");
  } catch (error) {
    console.error("Failed to create link tag", error);
    res.status(500).send("Failed to create link tag");
  }
};
