let express = require('express');
let controller = require('./Conference.controller');
let router = express.Router();
const auth = require('../../../auth/auth');

module.exports = function (app, db) {
  router.post('/create', auth, controller.createConference);
  router.get('/', controller.getConferences);
  router.get('/:id', controller.getConferenceById);
  router.put('/update/:id', auth, controller.updateConference);
  router.put('/updatestatus/:id', auth, controller.updateConferenceStatus);
  router.delete('/delete/:id', auth, controller.deleteConference);

  return { router: router };
}
