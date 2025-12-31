import { marked } from "marked";
import type { Request, Response } from "express";

import { html } from "../../lib/helper.ts";
import { baseTemplate } from "../templates/base.ts";

export type Entry = {
  id: number;
  title: string;
  content: string;
  modified_at: string;
  [k: string]: unknown;
};

function getContent(req: Request) {
  try {
    const stmt = req.db.prepare(
      "SELECT title, content, modified_at FROM entries WHERE type = ? AND private = 0 LIMIT 1",
    );
    const entry = stmt.get("maincontent");
    return entry as Entry;
  } catch (error) {
    console.error("Error fetching entry:", error);
    return {} as Entry;
  }
}

const template = (entry: Entry) =>
  html`
    <div class="md-content">
      ${marked.parse(entry.content) as string}
    </div>
  `;

export default (req: Request, res: Response) => {
  const entry = getContent(req);
  const content = template(entry);

  const html = baseTemplate(entry.title, content, entry.modified_at);
  res.send(html);
};
