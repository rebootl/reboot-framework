import type { Request, Response } from "express";

import type { LinkTagLocale } from "./locale.ts";
import type { LinkTagType } from "./template.ts";

import baseTemplate from "../../templates/base.ts";
import locale from "./locale.ts";
import template from "./template.ts";

type LinkTagRow = {
  id: number;
  name: string;
  color: string | null;
};

function fetchTags(req: Request): LinkTagRow[] {
  try {
    const stmt = req.db.prepare(
      "SELECT id, name, color FROM link_tags ORDER BY name COLLATE NOCASE",
    );
    return stmt.all() as LinkTagRow[];
  } catch (error) {
    console.error("Error fetching CMS link tags:", error);
    return [] as LinkTagRow[];
  }
}

function buildCard(row: LinkTagRow): LinkTagType {
  return {
    id: row.id,
    name: row.name || "Untitled tag",
    color: String(row.color || ""),
  };
}

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const currentLanguage = req.lang || "en";
  const currentLocale = locale[currentLanguage] || locale.en;
  const tags = fetchTags(req);
  const cards = tags.map((tag) => buildCard(tag));

  const content = template(currentLocale, cards);
  const html = baseTemplate(content, req);
  res.send(html);
};
