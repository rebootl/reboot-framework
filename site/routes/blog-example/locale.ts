export type Locale = Record<string, { title: string; description: string }>;

const locale: Locale = {
  en: {
    title: "RevampIt Blog",
    description:
      "A space for exploring sustainability, open source, and the art of giving technology a second life.",
  },
  de: {
    title: "RevampIt Blog",
    description:
      "Ein Ort, um Nachhaltigkeit, Open Source und die Kunst zu erforschen, Technologie ein zweites Leben zu geben.",
  },
};

export default locale;
