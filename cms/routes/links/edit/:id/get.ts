import type { Request, Response } from "express";

import baseTemplate from "../../../../templates/base.ts";
import editLinkTemplate from "./template.ts";

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

  try {
    const stmt = req.db.prepare(
      "SELECT id, title, url, comment FROM links WHERE id = ? LIMIT 1",
    );
    const row = stmt.get(id);
    if (!row) {
      const content = `
        <div class="rounded-2xl border border-dark-border bg-dark-surface/60 p-8 text-center text-dark-muted">
          Link not found.
        </div>
      `;
      const html = baseTemplate(content, req);
      res.status(404).send(html);
      return;
    }

    const content = editLinkTemplate({
      id: Number(row.id),
      title: String(row.title || ""),
      url: String(row.url || ""),
      comment: String(row.comment || ""),
    });
    const html = baseTemplate(content, req);
    res.send(html);
  } catch (error) {
    console.error("Failed to load link", error);
    res.status(500).send("Failed to load link");
  }
};
