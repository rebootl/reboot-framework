export type LinkLocale = {
  title: string;
  emptyState: string;
  labels: {
    title: string;
    url: string;
    comment: string;
    created: string;
    modified: string;
    actions: string;
  };
};

const locale: Record<string, LinkLocale> = {
  en: {
    title: "Links",
    emptyState: "No links have been added yet.",
    labels: {
      title: "Title",
      url: "URL",
      comment: "Comment",
      created: "Created",
      modified: "Updated",
      actions: "Actions",
    },
  },
  de: {
    title: "Links",
    emptyState: "Noch keine Links vorhanden.",
    labels: {
      title: "Titel",
      url: "URL",
      comment: "Kommentar",
      created: "Erstellt",
      modified: "Aktualisiert",
      actions: "Aktionen",
    },
  },
};

export default locale;
