import type { Request, Response } from "express";

import baseTemplate from "../../../../templates/base.ts";
import { tagForm } from "../../new/template.ts";

type LinkTagRow = {
  id: number;
  name: string;
  color: string;
};

function fetchTag(req: Request, id: number): LinkTagRow | null {
  try {
    const stmt = req.db.prepare(
      "SELECT id, name, color FROM link_tags WHERE id = ? LIMIT 1",
    );
    const row = stmt.get(id);
    if (!row) {
      return null;
    }
    return {
      id: Number(row.id),
      name: String(row.name || ""),
      color: String(row.color || ""),
    };
  } catch (error) {
    console.error("Failed to load link tag", error);
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
    res.status(400).send("Invalid tag id");
    return;
  }

  const tag = fetchTag(req, id);
  if (!tag) {
    const content = `
      <div class="rounded-2xl border border-dark-border bg-dark-surface/60 p-8 text-center text-dark-muted">
        Link tag not found.
      </div>
    `;
    const html = baseTemplate(content, req);
    res.status(404).send(html);
    return;
  }

  const content = tagForm({ id: tag.id, name: tag.name, color: tag.color }, true);
  const html = baseTemplate(content, req);
  res.send(html);
};
