let express = require('express');
let controller = require('./User.controller');
let rotuer = express.Router();

module.exports = function (app, db) {
  rotuer.post('/create', controller.createUser);

  return {
    router: rotuer
  }
}