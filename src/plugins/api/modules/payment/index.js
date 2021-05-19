let express = require('express');
let controller = require('./Payment.controller');
let auth = require('../../../auth/auth');
const router = express.Router();

module.exports = function (app, db) {
  router.post('/charge', auth, controller.changeAmount);

  return { router: router };
}