export const numLatinToAr = (n:string) => n.replace(/\d/g, (d:string) => '٠١٢٣٤٥٦٧٨٩'[d as any]).replace(/\./g, '٫');

