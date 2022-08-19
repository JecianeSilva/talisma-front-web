function getDate(date) {
  date = new Date(date);
  date = date.toJSON();
  date = date.split("T", 1)[0];
  return date;
}
export { getDate };
