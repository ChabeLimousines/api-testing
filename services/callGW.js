const config = require('config');
const qs = require('qs');
const axios = require('axios');
require('dotenv').config();

const gatewayUsername = process.env.APIUSERNAME || config.services.gateway.username;
const gatewayApiKey = process.env.APIKEY || config.services.gateway.apikey;

class GWCaller {

  async call(method, url, params = {}, headers = {}, body = {}) {
    try {
      const filteredHeaders = { ...headers, authorization: '' };
      const call = {
        baseURL: `http://${config.services.gateway.host}:${config.services.gateway.port}`,
        method,
        url,
        params,
        paramsSerializer: ps => qs.stringify(ps, { arrayFormat: 'brackets' }),
        headers: filteredHeaders,
        data: body,
        auth: {
          username: gatewayUsername,
          password: gatewayApiKey,
        },
      };
      return await axios(call);
    } catch (e) {
      throw e.response || e;
    }
  };
};

GWCaller.methods = {
  POST,
  GET,
  PATCH,
  DELETE,
};

module.exports = GWCaller;