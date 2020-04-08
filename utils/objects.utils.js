module.exports = {
  strToUpper: (object) => {
    Object.keys(object).forEach((key) => {
      object[key] = (typeof object[key] === 'string' ? object[key].toLocaleUpperCase() : object[key]);
    });
    return object;
  },
  updatedObject: (object, updates) => {
    Object.keys(object).forEach((key) => {
      object[key] = updates[key] || object[key];
    });
    return object;
  },
};
