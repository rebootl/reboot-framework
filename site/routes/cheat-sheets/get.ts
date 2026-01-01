import type { Request, Response } from "express";

import { baseTemplate } from "../../templates/base.ts";
import template, { type Entry } from "./template.ts";

export function getContent(req: Request) {
  try {
    const stmt = req.db.prepare(
      "SELECT title, content, modified_at FROM entries WHERE type = ? AND private = 0 LIMIT 1",
    );
    const entry = stmt.get("cheatsheet-list");
    return entry as Entry;
  } catch (error) {
    console.error("Error fetching cheat sheet entry:", error);
    return {} as Entry;
  }
}

export function getEntries(req: Request) {
  try {
    const stmt = req.db.prepare(
      "SELECT id, title, modified_at FROM entries WHERE type = ? AND private = 0 ORDER BY created_at DESC",
    );
    const entries = stmt.all("cheatsheet");
    return entries as Entry[];
  } catch (error) {
    console.error("Error fetching cheat sheet entries:", error);
    return [] as Entry[];
  }
}

export default (req: Request, res: Response) => {
  const entry = getContent(req);
  const entries = getEntries(req);

  const content = template(entries, entry);
  const html = baseTemplate(entry.title, content, entry.modified_at);
  res.send(html);
};
