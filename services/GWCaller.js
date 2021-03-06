/* eslint-disable class-methods-use-this */
const config = require('config');
const qs = require('qs');
const axios = require('axios');
require('dotenv').config();

const gatewayUsername = process.env.APIUSERNAME || config.gateway.username;
const gatewayApiKey = process.env.APIKEY || config.gateway.apikey;

class GWCaller {
  async call(method, url, params = {}, headers = {}, body = {}) {
    try {
      const filteredHeaders = { ...headers, authorization: '' };
      const call = {
        baseURL: `http://${config.gateway.host}:${config.gateway.port}`,
        method,
        url,
        params,
        paramsSerializer: (ps) => qs.stringify(ps, { arrayFormat: 'brackets' }),
        headers: filteredHeaders,
        data: body,
        auth: {
          username: gatewayUsername,
          password: gatewayApiKey,
        },
        timeout: 25000,
      };
      return await axios(call);
    } catch (e) {
      throw e.response || e;
    }
  }
}

module.exports = GWCaller;
