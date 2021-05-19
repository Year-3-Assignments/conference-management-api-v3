import Resource from './Resource.model';
import Notification from '../user/Notification.model';
import response from '../../../../lib/response.handler';
import _ from 'lodash';

export async function createResource(req, res, next) {
  if (req.body) {
    let resource = new Resource(req.body);
    await resource.save()
    .then(() => {
      response.sendRespond(res, resource);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });
  }
}

export async function getAllResouces(req, res, next) {
  await Resource.find({})
  .populate('createdby', '_id firstname lastname email username phonenumber imageurl description')
  .populate('resourcepersons', '_id firstname lastname email username phonenumber imageurl description')
  .then((data) => {
    response.sendRespond(res, data);
    next();
  })
  .catch(error => {
    response.handleError(res, error.message);
    next();
  });
}

export async function getResourceById(req, res, next) {
  if (req.params && req.params.id) {
    await Resource.findById(req.params.id)
    .populate('createdby', '_id firstname lastname email username phonenumber imageurl description')
    .populate('resourcepersons', '_id firstname lastname email username phonenumber imageurl description')
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

export async function getResourcesForEditor(req, res, next) {
  await Resource.find({ ispaid: true })
  .populate('createdby', '_id firstname lastname email username phonenumber imageurl description')
  .populate('resourcepersons', '_id firstname lastname email username phonenumber imageurl description')
  .then((data) => {
    response.sendRespond(res, data);
    next();
  })
  .catch(error => {
    response.handleError(res, error.message);
    next();
  });
}

export async function updateResource(req, res, next) {
  if (req.body) {
    let resource = await Resource.findById(req.body._id);
    if (!resource) {
      response.handleError(res, 'Resource not found');
      return;
    }
    let resourceUpdateData = {
      name: req.body.name,
      venue: req.body.venue,
      time: req.body.time,
      description: req.body.description,
      resourceurls: req.body.resourceurls,
      resourcepersons: req.body.resourcepersons
    };
    
    await Resource.findByIdAndUpdate(req.body._id, resourceUpdateData)
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

export async function changeResourceStatus(req, res, next) {
  if (req.user && req.params && req.params.id) {
    if (_.isEqual(req.user.role, 'ROLE_REVIEWER')) {
      let status = null;
      let resource = await Resource.findById(req.params.id);
      if (!resource) {
        response.handleError(res, 'Resource not found');
        return;
      }

      if (_.isEqual(req.body.status, 'APPROVED')) {
        // mark resource as approved
        status = 'APPROVED';

        // send a notification to relevent user
        let notificationData = {
          resource: resource._id,
          from: req.user._id,
          message: `Your resources are approved by ${req.user.firstname}`,
          to: resource.createdby,
          isarchive: false
        }
        let notification = new Notification(notificationData);
        await notification.save()
      }

      if (_.isEqual(req.body.status, 'PENDING')) {
        // mark resource as pending
        status = 'PENDING';

        // send a notification to relevent user
        let notificationData = {
          resource: resource._id,
          from: req.user._id,
          message: `Your resources are rejected by ${req.user.firstname}`,
          to: resource.createdby,
          isarchive: false
        }
        let notification = new Notification(notificationData);
        await notification.save()
      }

      await Resource.findByIdAndUpdate(req.params.id, { status: status })
      .then(data => {
        response.sendRespond(res, data);
        next();
      })
      .catch(error => {
        response.handleError(res, error.message);
        next();
      });
    } else {
      response.handleError(res, 'Only Reviewer can change the status');
      next();
    }
  }
}

export async function deleteResource(req, res, next) {
  if (req.params && req.params.id) {
    if (_.isEqual(req.user.role, 'ROLE_PRESENTER') || _.isEqual(req.user.role, 'ROLE_RESEARCHER')) {
      let resource = await Resource.findById(req.params.id);
      if (!resource) {
        response.handleError(res, 'Resource not found');
        return;
      }

      await Resource.findByIdAndDelete(req.params.id)
      .then(data => {
        response.sendRespond(res, data);
        next();
      })
      .catch(error => {
        response.handleError(res, error.message);
        next();
      });
    } else {
      response.handleError(res, 'Only presenter and researcher can delete their resources');
      return;
    }
  }
}

export async function makeResourcePaid(req, res, next) {
  if (req.params && req.params.id) {
    let resource = await Resource.findById(req.params.id);
    if (!resource) {
      response.handleError(res, 'Resource not found');
      return;
    }

    await Resource.findByIdAndUpdate(req.params.id, { ispaid: true })
    .then(data => {
      response.sendRespond(res, data);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });
  } else {
    response.handleError(res, 'Please provide necessary fields');
    return;
  }
}