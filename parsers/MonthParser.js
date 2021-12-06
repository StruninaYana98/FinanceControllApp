export function parseDatetoMonthYearString(date) {
  return (
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    date.getFullYear()
  );
}
export const monthsList = [
  { name: "January", id: 0 },
  { name: "February", id: 1 },
  { name: "March", id: 2 },
  { name: "April", id: 3 },
  { name: "May", id: 4 },
  { name: "June", id: 5 },
  { name: "July", id: 6 },
  { name: "August", id: 7 },
  { name: "September", id: 8 },
  { name: "October", id: 9 },
  { name: "November", id: 10 },
  { name: "December", id: 11 },
];
export function getMonthName(date) {
  return  monthsList[date.getMonth()].name;
}
