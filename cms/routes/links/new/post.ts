import type { Request, Response } from "express";

const parseField = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const currentUserId = req.locals.userId;
  if (currentUserId === null) {
    res.status(401).send("User not authenticated");
    return;
  }

  const title = parseField(req.body.title);
  const url = parseField(req.body.url);
  if (!title || !url) {
    res.status(400).send("Title and URL are required");
    return;
  }

  const comment = parseField(req.body.comment);
  const now = new Date().toISOString();

  try {
    const stmt = req.db.prepare(
      "INSERT INTO links (user_id, created_at, modified_at, title, url, comment) VALUES (?, ?, ?, ?, ?, ?)",
    );
    stmt.run(
      currentUserId,
      now,
      now,
      title,
      url,
      comment,
    );

    res.redirect("/cms/links?message=successCreate");
  } catch (error) {
    console.error("Failed to create link", error);
    res.status(500).send("Failed to create link");
  }
};
