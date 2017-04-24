function getDate() {
  const d = new Date();
  return {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  };
}

module.exports = {
  getDate,
};
