  
let express = require('express');
let controller = require('./Keynote.controller');
let router = express.Router();
//const auth = require('../../../auth/auth');

module.exports = function (app, db) {
    router.post('/create', controller.createKeynote);

    //router.get('/adtendees', auth, controller.getAtendeeAccounts);

  return { router: router };
}