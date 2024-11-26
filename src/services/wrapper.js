const axios = require('axios');
const { baseUrl } = require('../config/config');
const { acceptHeaders, jsonHeaders } = require('../config/headers');
const { createUrl } = require('./url');

class ApiClient {
  constructor(baseURL = baseUrl) {
    this.client = axios.create({
      baseURL,
      headers: jsonHeaders,
    });
  }

  async get(endpoint, headers = acceptHeaders) {
    try {
      const url = createUrl(endpoint);
      const response = await this.client.get(url, { headers });
      return this._handleResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  async post(endpoint, data = {}, headers = jsonHeaders) {
    try {
      const url = createUrl( endpoint);
      const response = await this.client.post(url, data, { headers });
      return this._handleResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }


  async put(endpoint, data = {}, headers = jsonHeaders) {
    try {
      const url = createUrl(endpoint);
      const response = await this.client.put(url, data, { headers });
      return this._handleResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }

  async delete(endpoint, headers = acceptHeaders) {
    try {
      const url = createUrl(endpoint);
      const response = await this.client.delete(url, { headers });
      return this._handleResponse(response);
    } catch (error) {
      return this._handleError(error);
    }
  }


  _handleResponse(response) {
    return {
      status: response.status,
      headers: response.headers,
      data: response.data,
    };
  }

  _handleError(error) {
    return {
      status: error.response?.status || 500,
      headers: error.response?.headers || {},
      data: error.response?.data || {},
    };
  }
}

module.exports = new ApiClient();
