let express = require('express');
let controller = require('./User.controller');
let router = express.Router();
const auth = require('../../../auth/auth');

module.exports = function (app, db) {
  router.post('/create', controller.createUser);
  router.post('/login', controller.userLogin);
  router.get('/', auth, controller.getUserAccount);
  router.get('/notifications', auth, controller.getUserNotifications);
  router.put('/makearchive/:id', auth, controller.makeArchive);
  router.put('/update', auth, controller.updateUserAccount);
  router.delete('/delete', auth, controller.deleteUserAccount);
  router.get('/admins', auth, controller.getAdminAccounts);
  router.get('/reviewers', auth, controller.getReviewerAccounts);
  router.get('/editors', auth, controller.getEditorAccounts);
  router.get('/presenters', auth, controller.getPresenterAccounts);
  router.get('/reseachers', auth, controller.getResearcherAccounts);
  router.get('/adtendees', auth, controller.getAtendeeAccounts);

  return { router: router };
}