module.exports = {
  strToUpper: (array) => array.map((val) => (typeof val === 'string' ? val.toLocaleUpperCase() : val)),
  updatedObject: (object, updates) => Object.keys(object).map((key) => updates[key] || object[key]),
};
