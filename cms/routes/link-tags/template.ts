import type { LinkTagLocale } from "./locale.ts";
import { html } from "../../../lib/helper.ts";

export type LinkTagType = {
  id: number;
  name: string;
  color: string;
};

export default (locale: LinkTagLocale, tags: LinkTagType[]) =>
  html`
    <section class="space-y-6 mx-auto">
      ${tags.length === 0
        ? `<div class="rounded-2xl border border-dark-border bg-dark-surface/50 p-6 text-center text-dark-muted">
        ${locale.emptyState}
      </div>`
        : `
      <div class="rounded-2xl border border-dark-border bg-dark-surface/50 p-8 pt-6">
        <header class="space-y-4 text-left">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h1 class="text-2xl font-bold text-white">${locale.title}</h1>
            </div>
            <a
              href="/cms/link-tags/new"
              class="inline-flex items-center justify-center rounded-md bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-500"
            >
              Add tag
            </a>
          </div>
        </header>

        <div class="overflow-auto border-b border-dark-border bg-dark-bg">
          <table class="min-w-full text-sm text-left text-dark-muted">
            <thead class="bg-dark-surface text-xs text-dark-muted/80">
              <tr>
                <th class="px-4 py-3">${locale.labels.name}</th>
                <th class="px-4 py-3">${locale.labels.color}</th>
                <th class="px-4 py-3">${locale.labels.actions}</th>
              </tr>
            </thead>
            <tbody>
              ${
          tags
            .map((tag) => `
                  <tr class="border-t bg-dark-surface/50 border-dark-border/70 hover:bg-dark-surface/70">
                    <td class="px-4 py-4 text-white font-semibold">${tag.name}</td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center px-2 py-1 rounded-md border border-dark-border" style="background-color: ${tag.color}; color: white;">
                        ${tag.color}
                      </span>
                    </td>
                    <td class="px-4 py-4">
                      <a
                        href="/cms/link-tags/edit/${tag.id}"
                        class="inline-flex items-center px-2.5 py-1 font-semibold border border-dark-border rounded-md text-white hover:bg-dark-surface/50 transition-colors"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                `)
            .join("")
        }
            </tbody>
          </table>
        </div>
      </div>
    `}
    </section>
  `;
