let express = require('express');
let controller = require('./Workshop.controller');
let router = express.Router();
const auth = require('../../../auth/auth');

module.exports = function (app, db) {
  router.post('/create', auth , controller.createWorkshop);
  router.get('/', controller.getAllWorkshops);
  router.get('/:id', controller.getWorkshopById);
  router.put('/update',auth, controller.updateWorkshop);
  router.delete('/remove/:id', auth, controller.deleteWorkshop);

  return { router: router }
}