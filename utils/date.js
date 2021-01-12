function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function isTodayOrGreather(date) {
  console.log(date);
  return date <= new Date();
}

module.exports = {
  formatDate,
  isTodayOrGreather,
};
