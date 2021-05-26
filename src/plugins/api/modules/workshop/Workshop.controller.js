const Workshop = require('./Workshop.model');
import response from '../../../../lib/response.handler';
import _ from 'lodash';
import User from '../user/User.model.js'
import Notification from '../user/Notification.model'

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

export async function addAttendee(req, res, next) {

  if (req.user && req.body) {

      let workshop = await Workshop.findById(req.body._id);

      if (!workshop) {
        response.handleError(res, 'Workshop not found');
        return;
      }

      let notification_name = ""

      // Add details to Workshop      
      await Workshop.findByIdAndUpdate(req.body._id, { $push: {attendees: req.user._id}})
      .then( async () => {
        // Add details to User Collection
        await User.findByIdAndUpdate({ _id: req.user._id }, { $push: {attending_workshops: req.body._id}})
      }).then(async () => {
        let data = await Workshop.findById(req.body._id)
        notification_name = data.name;
      }).then(async () => {
          // Add details to Notification Collection
          let notificationDetail = {
            workshop: req.body._id,
            message: req.body.message + " " + notification_name,
            to: req.user._id,
            isarchive: false
          }
          let notification = new Notification(notificationDetail);
          await notification.save()
      }).then(() => {
        res.status(200).send({message: 'Conference Added Successfully.'});

      })
      .catch(error => {
        res.status(400).send({message: 'Error Occured.'});
      });

      return;
  }
}