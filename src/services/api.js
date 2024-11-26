const { baseUrl } = require('../config/config');
const { createUrl } = require('./url');
const apiClient = require('./wrapper');

// Function for creating a board
const createBoard = async (boardName) => {
  return apiClient.post('',{ name: boardName } );
};

// Function for receiving the board
const getBoard = async (boardId) => {
  return apiClient.get(boardId)
};

// Function for updating the board
const updateBoard = async (boardId, boardName) => {
  return apiClient.put(boardId, { name: boardName });
};

// Function for removing the board
const deleteBoard = async (boardId) => {
  return apiClient.delete(boardId);
};

module.exports = { createBoard, getBoard, updateBoard, deleteBoard };