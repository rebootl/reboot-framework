import type { Request, Response } from "express";

// import type { LinkLocale } from "./locale.ts";
import type { LinkType } from "./template.ts";

import baseTemplate from "../../templates/base.ts";
import locale from "./locale.ts";
import template from "./template.ts";

type LinkRow = {
  id: number;
  title: string;
  url: string;
  comment: string | null;
  created_at: string;
  modified_at: string;
  [key: string]: unknown;
};

function fetchLinks(req: Request): LinkRow[] {
  try {
    const stmt = req.db.prepare(
      "SELECT id, title, url, comment, created_at, modified_at FROM links ORDER BY created_at DESC",
    );
    return stmt.all() as LinkRow[];
  } catch (error) {
    console.error("Error fetching CMS links:", error);
    return [] as LinkRow[];
  }
}

function formatDate(value: string, lang: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(lang, {
    dateStyle: "medium",
  }).format(date);
}

function buildCard(row: LinkRow, lang: string): LinkType {
  return {
    id: row.id,
    title: row.title || "Untitled link",
    url: row.url || "",
    comment: String(row.comment || ""),
    createdLabel: formatDate(String(row.created_at || ""), lang),
    modifiedLabel: formatDate(String(row.modified_at || ""), lang),
  };
}

export default (req: Request, res: Response) => {
  if (!req.locals.loggedIn) {
    res.redirect("/cms/login");
    return;
  }

  const currentLanguage = req.lang || "en";
  const currentLocale = locale[currentLanguage] || locale.en;
  const links = fetchLinks(req);
  const cards = links.map((link) => buildCard(link, currentLanguage));

  const content = template(currentLocale, cards);
  const html = baseTemplate(content, req);
  res.send(html);
};
