export function toPersianNumbers(input: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}
