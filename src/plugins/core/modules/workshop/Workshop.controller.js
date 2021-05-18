const Workshop = require('./Workshop.model');
import response from '../../../../lib/response.handler';
import _ from 'lodash';

export async function createWorkshop(req, res, next) {
  if (req.body) {
    console.log(req.body)
    let workshop = new Workshop(req.body);
    await workshop.save()
    .then(() => {
      response.sendRespond(res, workshop);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });
  }
}

//update workshops
export async function updateWorkshop(req, res, next) {
  if (req.body && req.body._id) {
    console.log(req.body);
    let workshop = await Workshop.findById(req.body._id);
    if (!workshop) {
      response.handleError(res, 'Workshop  not found');
      return;
    }
    let workshopUpdateData = {
      name: req.body.name,
      description: req.body.description,
      createddate: req.body.createddate,
      time: req.body.time,
      place: req.body.place,
      users: req.body.users,
      attendees: req.body.attendees
    };
    
    await Workshop.findByIdAndUpdate(req.body._id, workshopUpdateData)
    .then(data => {
      response.sendRespond(res, data);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });
  }
}

// delete workshops
export async function deleteWorkshop(req, res, next) {
  if (req.params && req.params.id) {
    const workshop = await Workshop.findByIdAndDelete(req.workshop.id);
    response.sendRespond(res, workshop);
    next();
  } else {
    response.handleError(req, 'Parameter id is required');
    next();
  }
}

// get all workshop details
export async function getAllWorkshops(req, res, next) {
  await Workshop.find({})
  .populate('users', '_id firstname lastname description imageurl email phonenumber')
  .populate('attendees', '_id firstname lastname description imageurl email phonenumber ')
  .then((data) => {
    response.sendRespond(res, data);
    next();
  })
  .catch(error => {
    response.handleError(res, error.message);
    next();
  });
}

//get workshop by ID 
export async function getWorkshopById(req, res, next) {
  if (req.params && req.params.id) {
    await Workshop.findById(req.params.id)
    .populate('users', '_id firstname lastname description imageurl email phonenumber')
    .populate('attendees', '_id firstname lastname description imageurl email phonenumber ')
    .then((data) => {
      response.sendRespond(res, data);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });
  }
}