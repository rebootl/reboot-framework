import type { Request, Response } from "express";

import { baseTemplate } from "../../templates/base.ts";
import locale from "./locale.ts";
import template from "./template.ts";

export type BlogEntry = {
  title?: string;
  content?: string;
  slug?: string;
  [k: string]: any;
};

function getBlogEntries(req: Request) {
  const lang = req.lang || "en";
  try {
    const stmt = req.db.prepare(
      "SELECT * FROM entries WHERE type = ? AND draft = 0 AND language = ? ORDER BY created_at DESC",
    );
    const entries = stmt.all("blog", lang);
    return entries as BlogEntry[];
  } catch (error) {
    console.error("Error fetching blog entries:", error);
    return [] as BlogEntry[];
  }
}

export default (req: Request, res: Response) => {
  const entries = getBlogEntries(req);
  const lang = req.lang || "en";

  const content = template(locale[lang] || locale.en, entries);
  const html = baseTemplate({ content, req });
  res.send(html);
};
