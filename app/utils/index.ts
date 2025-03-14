export function enrichText(text: string) {
  return text.replaceAll("\n\n", "<br />");
}