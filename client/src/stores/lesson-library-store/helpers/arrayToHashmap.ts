export default data => {
  if (data === undefined) {
    return {};
  }

  if (data.rows.length === 0) {
    return {};
  }
  return data.rows.reduce((map, item) => {
    map[item[0]] = item[1];
    return map;
  }, {});
};
