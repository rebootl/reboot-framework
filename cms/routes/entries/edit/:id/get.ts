import type { Request, Response } from "express";

import baseTemplate from "../../../../templates/base.ts";
import editTemplate, { EntryEditData } from "./template.ts";

function fetchEntry(req: Request, id: number): EntryEditData | null {
  try {
    const stmt = req.db.prepare(
      "SELECT id, title, type, content, private FROM entries WHERE id = ? LIMIT 1",
    );
    const row = stmt.get(id);
    if (!row) {
      return null;
    }
    return {
      id: Number(row.id) || id,
      title: String(row.title || ""),
      type: String(row.type || ""),
      content: String(row.content || ""),
      isPrivate: Number(row.private) === 1,
    };
  } catch (error) {
    console.error("Failed to load entry", error);
    return null;
  }
}

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const rawId = req.params.id;
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    res.status(400).send("Invalid entry id");
    return;
  }

  const entry = fetchEntry(req, id);
  if (!entry) {
    const content = `
      <div class="rounded-2xl border border-dark-border bg-dark-surface/60 p-8 text-center text-dark-muted">
        Entry not found.
      </div>
    `;
    const html = baseTemplate(content, req);
    res.status(404).send(html);
    return;
  }

  const content = editTemplate(entry);
  const html = baseTemplate(content, req);
  res.send(html);
};
