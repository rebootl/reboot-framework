import type { LinkLocale } from "./locale.ts";
import { html } from "../../../lib/helper.ts";

export type LinkType = {
  id: number;
  title: string;
  url: string;
  comment: string;
  createdLabel: string;
  modifiedLabel: string;
};

export default (locale: LinkLocale, links: LinkType[]) =>
  html`
    <section class="space-y-6 mx-auto">
      ${links.length === 0
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
              href="/cms/links/new"
              class="inline-flex items-center justify-center rounded-md bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-500"
            >
              Add link
            </a>
          </div>
        </header>

        <div class="overflow-auto border-b border-dark-border bg-dark-bg">
          <table class="min-w-full text-sm text-left text-dark-muted">
            <thead class="bg-dark-surface text-xs text-dark-muted/80">
              <tr>
                <th class="px-4 py-3 w-[24%]">${locale.labels.title}</th>
                <th class="px-4 py-3 w-[28%]">${locale.labels.url}</th>
                <th class="px-4 py-3 w-[20%]">${locale.labels.comment}</th>
                <th class="px-4 py-3 w-[12%]">${locale.labels.created}</th>
                <th class="px-4 py-3 w-[12%]">${locale.labels.modified}</th>
                <th class="px-4 py-3 w-[8%]">${locale.labels.actions}</th>
              </tr>
            </thead>
            <tbody>
              ${
          links
            .map((link) => `
                  <tr class="border-t bg-dark-surface/50 border-dark-border/70 hover:bg-dark-surface/70">
                    <td class="px-4 py-4 text-white font-semibold max-w-[200px] truncate">${link.title}</td>
                    <td class="px-4 py-4 text-dark-muted break-words max-w-[280px]"><a href="${link.url}" target="_blank" rel="noreferrer" class="text-white underline">${link.url}</a></td>
                    <td class="px-4 py-4 max-w-[180px] truncate">${
              link.comment || "—"
            }</td>
                    <td class="px-4 py-4">${link.createdLabel}</td>
                    <td class="px-4 py-4">${link.modifiedLabel}</td>
                    <td class="px-4 py-4">
                      <a
                        href="/cms/links/edit/${link.id}"
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
