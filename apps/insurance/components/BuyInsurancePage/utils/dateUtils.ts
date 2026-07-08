import moment from "moment-jalaali";

export const parseToIso = (val?: string | null): string | undefined => {
  if (!val) return undefined;
  const v = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  if (/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(v)) {
    const parts = v.split(/[-\/]/);
    const year = Number(parts[0]);
    if (!Number.isNaN(year) && year >= 1300) {
      return moment(v, "jYYYY/jMM/jDD").format("YYYY-MM-DD");
    }
    return `${parts[0].padStart(4, "0")}-${parts[1].padStart(2, "0")}-${parts[2].padStart(2, "0")}`;
  }
  return undefined;
};

export const formatIsoToJalali = (iso?: string | null): string | null => {
  if (!iso) return null;
  return moment(iso, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
};

export const isoToJalali = (iso: string): string => {
  return moment(iso, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
};
