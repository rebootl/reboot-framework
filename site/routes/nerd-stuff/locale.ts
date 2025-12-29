export type LocaleEntry = { title: string; description: string };
export type Locale = Record<string, LocaleEntry>;

const locale: Locale = {
  en: {
    title: "Nerd Stuff",
    description:
      "A curated list of technical experiments, notes, and mini projects worth revisiting.",
  },
  de: {
    title: "Nerdkram",
    description:
      "Eine kuratierte Liste technischer Experimente, Notizen und Mini-Projekte zum Weiterforschen.",
  },
};

export default locale;
