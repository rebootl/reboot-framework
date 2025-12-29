import type { Request, Response } from "express";

import { baseTemplate } from "../../templates/base.ts";
import template from "./template.ts";

export type Entry = {
  id: number;
  title: string;
  created_at: string;
  [k: string]: unknown;
};

function getEntries(req: Request) {
  try {
    const stmt = req.db.prepare(
      "SELECT id, title, created_at FROM entries WHERE type = ? AND private = 0 ORDER BY created_at DESC",
    );
    const entries = stmt.all("nerdstuff");
    return entries as Entry[];
  } catch (error) {
    console.error("Error fetching nerd stuff entries:", error);
    return [] as Entry[];
  }
}

export default (req: Request, res: Response) => {
  const entries = getEntries(req);

  const content = template(entries);
  const html = baseTemplate(content);
  res.send(html);
};
