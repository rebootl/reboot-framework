import { html } from "../../../../../lib/helper.ts";

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type EntryEditData = {
  id: number;
  title: string;
  type: string;
  content: string;
  isPrivate: boolean;
};

export default (entry: EntryEditData) => {
  const entryId = String(entry.id);
  return html`
    <section class="space-y-10">
      <header class="space-y-2">
        <h1 class="text-4xl font-bold text-white">Editing Entry</h1>
        <p class="text-sm text-dark-muted max-w-3xl">
          Entry ID: ${entryId}<br />
        </p>
      </header>

      <form
        class="space-y-6 rounded-2xl border border-dark-border bg-dark-surface/60 p-6 shadow-xl"
        action="/cms/entries/edit/${entryId}"
        method="POST"
      >
        <div class="space-y-4">
          <label class="space-y-2">
            <span class="text-xs text-dark-muted">Title</span>
            <input
              type="text"
              name="title"
              value="${escapeHtml(entry.title)}"
              class="w-full rounded-xl border border-dark-border bg-dark-bg/60 px-3 py-2 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              required
            />
          </label>
          <label class="space-y-2">
            <span class="text-xs text-dark-muted">Type</span>
            <input
              type="text"
              name="type"
              value="${escapeHtml(entry.type)}"
              class="w-full rounded-xl border border-dark-border bg-dark-bg/60 px-3 py-2 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              required
            />
          </label>
        </div>


        <div class="space-y-2">
        <span class="text-xs text-dark-muted">Visibility</span>

          <select
            name="private"
            class="w-full rounded-xl border border-dark-border bg-dark-bg/60 px-3 py-2 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          >
            <option value="0" ${entry.isPrivate
              ? ""
              : "selected"}>Public</option>
            <option value="1" ${entry.isPrivate
              ? "selected"
              : ""}>Private</option>
          </select>
        </div>

        <div class="space-y-2">
        <span class="text-xs text-dark-muted">Content</span>

          <textarea
            name="content"
            rows="8"
            class="w-full rounded-2xl border border-dark-border bg-dark-bg/60 px-3 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          >${escapeHtml(entry.content)}</textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-lg bg-indigo-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-indigo-800"
          >
            Save changes
          </button>
        </div>
      </form>
    </section>
  `;
};
