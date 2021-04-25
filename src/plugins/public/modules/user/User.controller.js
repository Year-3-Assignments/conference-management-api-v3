const User = require('./User.model');

export function createUser(req, res, next) {
  let user = {
    name: req.body.name,
    university: req.body.university
  }
  const newUser = new User(user)
  newUser.save()
    .then(req.handleResponse.sendRespond(res))
    .catch(req.handleResponse.handleError(res));
}
