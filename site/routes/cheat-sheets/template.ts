import { marked } from "marked";
import { html } from "../../../lib/helper.ts";

export type Entry = {
  id: number;
  title: string;
  content?: string;
  modified_at: string;
};

export default (entries: Entry[], entry: Entry) =>
  html`
    <div class="md-content mb-8 mt-6">
      ${marked.parse(entry.content || "") as string}
    </div>
    <ul class="space-y-2">
      ${entries.length === 0
        ? html`
          <li class="text-slate-400">No cheat sheets to show yet.</li>
        `
        : entries
          .map(
            (entry) =>
              html`
                <li
                  class="p-4 rounded-md border border-dark-border"
                >
                  <a
                    href="/cheat-sheets/${String(entry.id)}"
                    class="text-green-300 hover:underline"
                  >
                    ${entry.title}
                  </a>
                </li>
              `,
          )
          .join("")}
    </ul>
  `;
