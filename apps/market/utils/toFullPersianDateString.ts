

export const toFullPersianDateString = (date:string) => {
  return new Intl.DateTimeFormat('fa-u-ca-persian', {
    dateStyle: 'full',
  })
    .format(new Date(date))
    .replace(/,/g, ' ')
    .split(' ')
    .reverse()
    .join(' ')
}