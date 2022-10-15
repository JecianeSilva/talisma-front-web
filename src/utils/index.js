function getDate(date) {
  date = new Date(date);
  date = date.toJSON();
  date = date.split("T", 1)[0];
  return date;
}

function formattedDate(date) {
  date = new Date(date);
  date = date.toJSON();
  date = date.split("T", 1)[0];
  date = date.split("-").reverse().join("/");
  return date;
}
export { getDate, formattedDate };
