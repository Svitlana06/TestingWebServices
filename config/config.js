require('dotenv').config();

module.exports = {
  apiKey: process.env.TRELLO_API_KEY,
  token: process.env.TRELLO_TOKEN,
  baseUrl: 'https://api.trello.com/boards'
};