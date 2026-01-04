import { html } from "../../lib/helper.ts";

export default (
  tags: Array<{
    id: number;
    name: string;
    selected: boolean;
  }>,
) =>
  html`
    <multi-selector class="space-y-2 block">
      <label class="space-y-2 block">
        <span class="text-xs text-dark-muted">Tags</span>
      </label>
      <select
        class="item-selector rounded-xl border border-dark-border bg-dark-bg/50 px-4 py-2 text-base text-white focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
      >
        ${tags.map((tag) =>
          `<option value="${String(tag.id)}">${tag.name}</option>`
        ).join("")}
      </select>
      <button
        class="add-button inline-flex items-center border border-dark-border rounded-md px-5 py-2 text-xs font-semibold text-white hover:bg-dark-surface/50 transition-colors"
      >
        Add
      </button>
      <select
        name="tags"
        class="multi-select"
        multiple
        style="display: none;"
      >
        ${tags.map((tag) =>
          `<option value="${String(tag.id)}" ${
            tag.selected ? "selected" : ""
          }>${tag.name}</option>`
        ).join("")}
      </select>
      <ul class="selected-items">
        <!-- Render selected tags -->
        ${tags.map((tag) =>
          tag.selected
            ? `
            <li class="selected-item inline-flex items-center rounded-md px-2 py-1 text-xs text-white bg-dark-surface">
                <span>${tag.name}</span>
                <button
                  class="remove-button inline-flex ml-1 items-center border border-dark-border rounded-md px-3 py-2 text-xs font-semibold text-white hover:bg-dark-surface/50 transition-colors"
                  data-item-id="${tag.id}"
                >
                  X
                </button>
                </li>`
            : ""
        ).join("")}
      </ul>
      <template class="selected-item-template">
        <li
          class="selected-item inline-flex items-center rounded-md px-2 py-1 text-xs text-white bg-dark-surface"
        >
          <span></span>
          <button
            class="remove-button inline-flex ml-1 items-center border border-dark-border rounded-md px-3 py-2 text-xs font-semibold text-white hover:bg-dark-surface/50 transition-colors"
            data-item-name=""
          >
            X
          </button>
        </li>
      </template>
    </multi-selector>
  `;
