export type LinkTagLocale = {
  title: string;
  emptyState: string;
  labels: {
    name: string;
    color: string;
    actions: string;
  };
};

const locale: Record<string, LinkTagLocale> = {
  en: {
    title: "Link Tags",
    emptyState: "No link tags configured yet.",
    labels: {
      name: "Name",
      color: "Color",
      actions: "Actions",
    },
  },
  de: {
    title: "Link-Tags",
    emptyState: "Keine Link-Tags vorhanden.",
    labels: {
      name: "Name",
      color: "Farbe",
      actions: "Aktionen",
    },
  },
};

export default locale;
