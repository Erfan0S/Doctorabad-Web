const formatter = new Intl.NumberFormat('fa-IR', {
  style: 'currency',
  currency: 'IRR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const priceFormatter = (price: string | number) => formatter.format(Number(price)).replace('ریال', '');
