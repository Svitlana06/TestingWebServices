const { expect } = require('chai');
const { createBoard, getBoard, updateBoard, deleteBoard } = require('../services/api');
const { boardName, boardNameUpdated, dataFormat, jsonDataFormat, nameProperty, idProperty } = require('../config/data');

describe('Trello Tests API', function () {
  let boardId;

  it('Creating a board', async function () {
    const response = await createBoard(boardName);
    boardId = response.data.id;

    expect(response.status).to.equal(200);
    expect(response.headers.get(dataFormat)).to.include(jsonDataFormat);
    expect(response.data).to.have.property(nameProperty, boardName);
    expect(response.data).to.have.property(idProperty);
  });

  it('Receiving the board', async function () {
    const response = await getBoard(boardId);

    expect(response.status).to.equal(200);
    expect(response.headers.get(dataFormat)).to.include(jsonDataFormat);
    expect(response.data).to.have.property(idProperty, boardId);
    expect(response.data).to.have.property(nameProperty);
  });

  it('Updating the board', async function () {
    const response = await updateBoard(boardId, boardNameUpdated);

    expect(response.status).to.equal(200);
    expect(response.headers.get(dataFormat)).to.include(jsonDataFormat);
    expect(response.data).to.have.property(nameProperty, boardNameUpdated);
  });

  it('Removing the board', async function () {
    const response = await deleteBoard(boardId);

    expect(response.status).to.equal(200);
  });
});