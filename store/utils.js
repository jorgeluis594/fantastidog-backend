function formatMysqlValues(data) {
  const copiedData = [];
  // eslint-disable-next-line no-unused-expressions
  Array.isArray(data) ? copiedData.push(...data) : copiedData.push(data);
  const keys = Object.keys(copiedData[0]);
  return [formatKeys(keys), formatValues(keys, copiedData)];
}

function formatKeys(keys) {
  return `(${keys.join(', ')})`;
}

function formatValues(keys, data) {
  return data.map((row) => keys.reduce((array, key) => {
    array.push(row[key]);
    return array;
  }, []));
}

module.exports = {
  formatMysqlValues,
};
