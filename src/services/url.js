const createUrl = (baseUrl, boardId = '', queryParams = {}) => {
  let url = `${baseUrl}${boardId}`;

  const query = new URLSearchParams({
    ...queryParams,
    key: process.env.TRELLO_API_KEY,
    token: process.env.TRELLO_TOKEN
  }).toString();

  return `${url}?${query}`;
};

module.exports = { createUrl };