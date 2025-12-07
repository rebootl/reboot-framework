import type { Request, Response } from "express";

import { baseTemplate } from "../../../templates/base.ts";

function getBlogEntry(req: Request) {
  const lang = req.lang || "en";

  const { slug } = req.params as { slug: string };

  try {
    const stmt = req.db.prepare(
      "SELECT * FROM entries WHERE type = ? AND slug = ? AND draft = 0 AND language = ? LIMIT 1",
    );
    const entry = stmt.get("blog", slug, lang);
    return entry;
  } catch (error) {
    console.error(`Error fetching blog entry with slug ${slug}:`, error);
    return null; // Return null if an error occurs
  }
}

export default (req: Request, res: Response) => {
  const entry = getBlogEntry(req);
  if (!entry) {
    const content = `
  <main class="pt-20 min-h-screen">
    <div class="container mx-auto px-4 py-16">
      <article class="prose lg:prose-xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 pb-10">Blog Entry Not Found</h1>
        <p>Sorry, the blog entry you are looking for does not exist.</p>
      </article>
    </div>
  </main>`;
    const html = baseTemplate({ content, req });
    res.send(html);
    return;
  }

  const content = `
  <main class="pt-20 min-h-screen">
    <div class="container mx-auto px-4 py-16">
      <article class="prose lg:prose-xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 pb-10">${entry.title}</h1>
        <div>${entry.content}</div>
      </article>
    </div>
  </main>`;

  const html = baseTemplate({ content, req });
  res.send(html);
};
