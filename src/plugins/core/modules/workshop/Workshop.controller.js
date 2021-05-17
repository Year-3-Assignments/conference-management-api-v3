const User = require('./Workshop.model');

export function createworkshop(req, res, next) {
  let user = {
    workshopname: req.body.workshopname,
    description: req.body.description,
    createddate:req.body.createddate,
    time: req.body.time,
    place:req.body.place,
    users: req.body.users,
    attendees: req.body.attendees
  }
  const newWorkshop = new Workshop(workshop)
  newWorkshop.save()
    .then(req.handleResponse.sendRespond(res))
    .catch(req.handleResponse.handleError(res));
}
