import { html } from "../../../../lib/helper.ts";

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type LinkTagFormData = {
  id?: number;
  name: string;
  color: string;
};

const defaultFormData: LinkTagFormData = {
  name: "",
  color: "",
};

export const tagForm = (tag: LinkTagFormData = defaultFormData, edit = false) =>
  html`
    <section class="max-w-3xl mx-auto space-y-6">
      <form
        class="space-y-6 rounded-xl bg-dark-surface/50 border border-dark-border p-8 pt-6"
        action="/cms/link-tags/${edit ? `edit/${tag.id}` : "new"}"
        method="POST"
      >
        <header class="space-y-2">
          <h1 class="text-2xl font-bold text-white">${edit ? "Edit Tag" : "Add Tag"}</h1>
        </header>
        <div class="space-y-4">
          <label class="space-y-2 block">
            <span class="text-xs text-dark-muted">Name</span>
            <input
              type="text"
              name="name"
              value="${escapeHtml(tag.name)}"
              class="w-full rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              required
            />
          </label>
          <label class="space-y-2 block">
            <span class="text-xs text-dark-muted">Color</span>
            <input
              type="color"
              name="color"
              value="${escapeHtml(tag.color || "#000000")}" 
              class="w-full max-w-[160px] rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-3 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            />
          </label>
        </div>

        <div class="flex justify-start mt-6">
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-md bg-emerald-400 px-5 py-2 text-xs font-semibold text-black transition hover:bg-emerald-500"
          >
            ${edit ? "Save" : "Create"}
          </button>
          <a
            href="/cms/link-tags"
            class="ml-4 inline-flex items-center border border-dark-border rounded-md px-5 py-2 text-xs font-semibold text-white hover:bg-dark-surface/50 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </section>
  `;
