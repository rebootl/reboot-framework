export type EntryLocale = {
  title: string;
  description: string;
  emptyState: string;
  labels: {
    created: string;
    modified: string;
    visibilityTitle: string;
    visibility: {
      public: string;
      private: string;
    };
  };
};

const locale: Record<string, EntryLocale> = {
  en: {
    title: "CMS Entries",
    description: "Manage and review existing entries stored in the system.",
    emptyState: "No entries found yet.",
    labels: {
      created: "Created",
      modified: "Updated",
      visibilityTitle: "Visibility",
      visibility: {
        public: "Public",
        private: "Private",
      },
    },
  },
  de: {
    title: "CMS-Einträge",
    description: "Bestehende Einträge im System verwalten und einsehen.",
    emptyState: "Keine Einträge gefunden.",
    labels: {
      created: "Erstellt",
      modified: "Aktualisiert",
      visibilityTitle: "Sichtbarkeit",
      visibility: {
        public: "Öffentlich",
        private: "Privat",
      },
    },
  },
};

export default locale;
