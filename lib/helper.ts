// No-op function, only used for syntax highlighting of HTML template literals ATM
export const html = (
  _strings: TemplateStringsArray,
  ..._values: string[]
): string => {
  return _strings.reduce((acc, str, i) => acc + str + (_values[i] || ""), "");
};

export const formatDate = (isoString: string, locale = "en-US") => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};
