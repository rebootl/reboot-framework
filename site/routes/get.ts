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

function getEntry(req: Request) {
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
    <!-- Welcome Section -->
    <article class="relative bg-dark-bg shadow-xl">
      <div
        class="grid grid-cols-1 md:grid-cols-2 md:[grid-template-columns:1fr_12rem] md:items-center gap-8"
      >
        <!-- Main column (text + links) -->
        <div class="flex-1">
          <h1 class="text-4xl font-bold mb-6 text-white">
            ${entry.title}
          </h1>

          ${entry.content}
        </div>

        <!-- Desktop image column (shown only on md+) -->
        <div class="flex items-center justify-center">
          <img
            src="/static/me-small.jpeg"
            alt="small false color colorized portray photo of myself"
            class="rounded-lg w-48 h-auto"
          >
        </div>
      </div>

      <!-- Full-width divider / meta row that should span across the article regardless of the right image -->
      <div class="mt-8 pt-6 border-t border-dark-border text-sm text-dark-muted">
        <p>Last modified: <time datetime="2025-11-15">${entry
          .modified_at}</time></p>
      </div>
    </article>
  `;

export default (req: unknown, res: Response) => {
  const entry = getEntry(req as Request);
  const content = template(entry);

  const html = baseTemplate(content);
  res.send(html);
};
