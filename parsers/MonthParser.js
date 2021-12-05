export function parseDatetoMonthYearString(date) {
  return (
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    date.getFullYear()
  );
}
