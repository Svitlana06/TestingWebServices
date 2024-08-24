const fetch = require('node-fetch');
const { baseUrl } = require('../config/config');
const { acceptHeaders, jsonHeaders } = require('../config/headers');
const { createUrl } = require('./url');

// Function for creating a board
const createBoard = async (boardName) => {
  const url = createUrl(baseUrl, '', { name: boardName });
  const response = await fetch(url, { method: 'POST', headers: jsonHeaders });
  const data = await response.json();
  return { status: response.status, headers: response.headers, data };
};

// Function for receiving the board
const getBoard = async (boardId) => {
  const url = createUrl(baseUrl, boardId);
  const response = await fetch(url, { method: 'GET', headers: acceptHeaders });
  const data = await response.json();
  return { status: response.status, headers: response.headers, data };
};

// Function for updating the board
const updateBoard = async (boardId, boardName) => {
  const url = createUrl(baseUrl, boardId, { name: boardName });
  const response = await fetch(url, { method: 'PUT', headers: jsonHeaders });
  const data = await response.json();
  return { status: response.status, headers: response.headers, data };
};

// Function for removing the board
const deleteBoard = async (boardId) => {
  const url = createUrl(baseUrl, boardId);
  const response = await fetch(url, { method: 'DELETE', headers: acceptHeaders });
  return { status: response.status };
};

module.exports = { createBoard, getBoard, updateBoard, deleteBoard };