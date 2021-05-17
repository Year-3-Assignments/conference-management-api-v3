let express = require('express');
let controller = require('./Workshop.controller');
let rotuer = express.Router();

module.exports = function (app, db) {
  rotuer.post('/displayworkshop', controller.createworkshop);

  return {
    router: rotuer
  }
}