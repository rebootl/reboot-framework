// No-op function, only used for syntax highlighting of HTML template literals ATM
export const html = (
  _strings: TemplateStringsArray,
  ..._values: string[]
): string => {
  return _strings.reduce((acc, str, i) => acc + str + (_values[i] || ""), "");
};
