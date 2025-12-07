import type { BlogEntry } from "./get.ts";
import type { Locale } from "./locale.ts";

export default (locale: Locale, entries: BlogEntry[]) => `
  <main class="pt-20 min-h-screen">
    <section class="bg-gray-200 py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-3xl font-bold mb-4">${locale.title}</h1>
        <p class="text-gray-600">${locale.description}</p>
      </div>
    </section>
    <div class="container mx-auto px-4 py-16">
      <ul class="grid grid-cols-1 gap-8">
        ${entries
    .map(
      (entry) => `
          <li class="bg-white rounded-lg shadow-md overflow-hidden">
            <a href="/blog/${entry.slug}" class="block hover:bg-gray-50">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-2">${entry.title}</h2>
                <p class="text-gray-700">${(entry.content || "").substring(0, 100)}...</p>
              </div>
            </a>
          </li>
        `,
    )
    .join("")}
      </ul>
    </div>
  </main>`;
