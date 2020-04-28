module.exports = {
  strToUpper: (object) => {
    Object.keys(object).forEach((key) => {
      object[key] = (typeof object[key] === 'string' ? object[key].toLocaleUpperCase() : object[key]);
    });
    return object;
  },
  updatedObject: (object, updates) => {
    const ret = { ...object };
    Object.keys(updates).forEach((key) => {
      ret[key] = updates[key];
    });
    return ret;
  },
  filterCommonKeys: (source, filter) => {
    const ret = {};
    Object.keys(filter).forEach((key) => {
      ret[key] = source[key];
    });
  },
};
