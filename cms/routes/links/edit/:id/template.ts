import { html } from "../../../../../lib/helper.ts";
import multiSelector from "../../../../templates/multi-selector.ts";

export type LinkEditFormData = {
  id: number;
  title: string;
  url: string;
  comment: string;
};

export default (
  link: LinkEditFormData,
  tags: Array<{
    id: number;
    name: string;
    selected: boolean;
  }>,
) =>
  html`
    <section class="max-w-3xl mx-auto space-y-6">
      <form
        class="space-y-6 rounded-xl bg-dark-surface/50 border border-dark-border p-8 pt-6"
        action="/cms/links/edit/${String(link.id)}"
        method="POST"
      >
        <header class="space-y-2">
          <h1 class="text-2xl font-bold text-white">Edit Link</h1>
        </header>
        <div class="space-y-4">
          <label class="space-y-2 block">
            <span class="text-xs text-dark-muted">Title</span>
            <input
              type="text"
              name="title"
              value="${link.title}"
              class="w-full rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              required
            />
          </label>
          <label class="space-y-2 block">
            <span class="text-xs text-dark-muted">URL</span>
            <input
              type="url"
              name="url"
              value="${link.url}"
              class="w-full rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              required
            />
          </label>
          <div class="space-y-2">
            <span class="text-xs text-dark-muted">Comment</span>
            <textarea
              name="comment"
              rows="4"
              class="w-full rounded-2xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            >${link.comment}</textarea>
          </div>
          <div class="space-y-2">
            ${multiSelector(tags)}
            <script
              type="module"
              src="/cms/static/components/multi-selector.js"
            ></script>
          </div>
        </div>

        <div class="flex justify-start mt-6">
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-md bg-emerald-400 px-5 py-2 text-xs font-semibold text-black transition hover:bg-emerald-500"
          >
            Save
          </button>
          <a
            href="/cms/links"
            class="ml-4 inline-flex items-center border border-dark-border rounded-md px-5 py-2 text-xs font-semibold text-white hover:bg-dark-surface/50 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </section>
  `;
