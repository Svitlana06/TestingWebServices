const axios = require('axios');
const { baseUrl } = require('../config/config');
const { acceptHeaders, jsonHeaders } = require('../config/headers');
const { createUrl } = require('./url');

// Function for creating a board
const createBoard = async (boardName) => {
  const url = createUrl(baseUrl, '', { name: boardName });
  try {
    const response = await axios.post(url, { headers: jsonHeaders }); 
    return { status: response.status, headers: response.headers, data: response.data }; 
  } catch (error) {
    return { status: error.response?.status || 500, headers: error.response?.headers || {}, data: error.response?.data || {} };
  }
};

// Function for receiving the board
const getBoard = async (boardId) => {
  const url = createUrl(baseUrl, boardId);
  try {
    const response = await axios.get(url, { headers: acceptHeaders });
    return { status: response.status, headers: response.headers, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, headers: error.response?.headers || {}, data: error.response?.data || {} };
  }
};

// Function for updating the board
const updateBoard = async (boardId, boardName) => {
  const url = createUrl(baseUrl, boardId, { name: boardName });
  try {
    const response = await axios.put(url, { headers: jsonHeaders });
    return { status: response.status, headers: response.headers, data: response.data };
  } catch (error) {
    return { status: error.response?.status || 500, headers: error.response?.headers || {}, data: error.response?.data || {} };
  }
};

// Function for removing the board
const deleteBoard = async (boardId) => {
  const url = createUrl(baseUrl, boardId);
  try {
    const response = await axios.delete(url, { headers: acceptHeaders });
    return { status: response.status };
  } catch (error) {
    return { status: error.response?.status || 500 };
  }
};

module.exports = { createBoard, getBoard, updateBoard, deleteBoard };