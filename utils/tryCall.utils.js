
const GWCaller = require('../services/GWCaller');

const gwCaller = new GWCaller();

module.exports = async function tryCall(verb, url, data = {}, params = {}) {
  let ret;
  try {
    ret = await gwCaller.call(verb, url, params, {}, data);
  } catch (e) {
    ret = e;
  }
  return ret;
};
