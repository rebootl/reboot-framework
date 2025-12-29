import { html } from "../../../lib/helper.ts";

export type NerdStuffEntry = {
  id: number;
  title: string;
  created_at: string;
};

export default (entries: NerdStuffEntry[]) =>
  html`
    <!-- Main column -->
    <div class="flex-1">
      <h1 class="text-4xl font-bold mb-6 text-white">
        Nerd Stuff
      </h1>
      <p class="text-dark-text leading-relaxed mb-4">
        Here I’m posting little live demos and experiments as well as notes about
        nerdy stuff. For example about the tech I’m using.
      </p>
      <ul class="space-y-2">
        ${entries.length === 0
          ? html`
            <li class="text-slate-400">Nothing nerdy to show right now.</li>
          `
          : entries
            .map(
              (entry) =>
                html`
                  <li
                    class="p-4 rounded-md border border-dark-border"
                  >
                    <a
                      href="/nerd-stuff/${String(entry.id)}"
                      class="text-green-300 hover:text-emerald-300 transition-colors duration-200"
                    >
                      ${entry.title}
                    </a>
                  </li>
                `,
            )
            .join("")}
      </ul>
    </div>
  `;
