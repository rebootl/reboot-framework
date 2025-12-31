import type { Request, Response } from "express";

import { baseTemplate } from "../../templates/base.ts";
import template from "./template.ts";

export type Entry = {
  id: number;
  title: string;
  content?: string;
  modified_at: string;
  [k: string]: unknown;
};

function getContent(req: Request) {
  try {
    const stmt = req.db.prepare(
      "SELECT title, content, modified_at FROM entries WHERE type = ? AND private = 0 LIMIT 1",
    );
    const entry = stmt.get("nerdstuff-list");
    return entry as Entry;
  } catch (error) {
    console.error("Error fetching entry:", error);
    return {} as Entry;
  }
}

function getEntries(req: Request) {
  try {
    const stmt = req.db.prepare(
      "SELECT id, title, modified_at FROM entries WHERE type = ? AND private = 0 ORDER BY created_at DESC",
    );
    const entries = stmt.all("nerdstuff");
    return entries as Entry[];
  } catch (error) {
    console.error("Error fetching nerd stuff entries:", error);
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
