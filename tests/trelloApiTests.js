const fetch = require('node-fetch');
const { expect } = require('chai');
require('dotenv').config();

const apiKey = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_TOKEN;

// Функція створення дошки
const createBoard = async (boardName) => {
  const url = `https://api.trello.com/1/boards/?name=${encodeURIComponent(boardName)}&key=${apiKey}&token=${token}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return { status: response.status, headers: response.headers, data };
};

// Функція отримання дошки
const getBoard = async (boardId) => {
  const url = `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${token}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });
  const data = await response.json();
  return { status: response.status, headers: response.headers, data };
};

// Функція оновлення дошки
const updateBoard = async (boardId, boardName) => {
  const url = `https://api.trello.com/1/boards/${boardId}?name=${encodeURIComponent(boardName)}&key=${apiKey}&token=${token}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return { status: response.status, headers: response.headers, data };
};

// Функція видалення дошки
const deleteBoard = async (boardId) => {
  const url = `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${token}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  });
  return { status: response.status };
};

// Тести
describe('Trello API Tests', function() {
  let boardId;

  it('повинен створити дошку', async function() {
    const response = await createBoard('Тестова дошка');
    boardId = response.data.id;

    expect(response.status).to.equal(200);
    expect(response.headers.get('content-type')).to.include('application/json');
    expect(response.data).to.have.property('name', 'Тестова дошка');
    expect(response.data).to.have.property('id');
  });

  it('повинен отримати дошку', async function() {
    const response = await getBoard(boardId);

    expect(response.status).to.equal(200);
    expect(response.headers.get('content-type')).to.include('application/json');
    expect(response.data).to.have.property('id', boardId);
    expect(response.data).to.have.property('name');
  });

  it('повинен оновити дошку', async function() {
    const response = await updateBoard(boardId, 'Оновлена дошка');

    expect(response.status).to.equal(200);
    expect(response.headers.get('content-type')).to.include('application/json');
    expect(response.data).to.have.property('name', 'Оновлена дошка');
  });

  it('повинен видалити дошку', async function() {
    const response = await deleteBoard(boardId);

    expect(response.status).to.equal(200);
  });
});