import Conference from './Conference.model';
import response from '../../../../lib/response.handler';
import _ from 'lodash';

export async function createConference(req, res, next) {
  if (req.user && req.body) {
    if (_.isEqual(req.user.role, 'ROLE_EDITOR')) {
      let conference = new Conference(req.body);
      await conference.save()
      .then(data => {
        response.sendRespond(res, data);
        next();
      })
      .catch(error => {
        response.handleError(res, error.message);
        next();
      });
    } else {
      response.handleError(res, 'Only Editor can create conference');
      next();
    }
  }
}

export async function getConferencesForAdmin(req, res, next) {
  await Conference.find({})
  .populate('createdby', '_id firstname, lastname email phonenumber imageurl')
  .populate('atendees', '_id firstname, lastname email phonenumber imageurl')
  .populate('resource', '_id resourceurls resourcepersons')
  .then(data => {
    response.sendRespond(res, data);
    next();
  })
  .catch(error => {
    response.handleError(res, data);
    next();
  });
}

export async function getConferenceById(req, res, next) {
  if (req.params && req.params.id) {
    await Conference.findById(req.params.id)
    .populate('createdby', '_id firstname, lastname email phonenumber imageurl')
    .populate('atendees', '_id firstname, lastname email phonenumber imageurl')
    .populate('resource', '_id resourceurls resourcepersons')
    .then(data => {
      response.sendRespond(res, data);
      next();
    })
    .catch(error => {
      response.handleError(res, data);
      next();
    });
  }
}

export async function getConferences(req, res, next) {
  await Conference.findById(req.params.id)
  .populate('createdby', '_id firstname, lastname email phonenumber imageurl')
  .populate('resource', '_id resourceurls resourcepersons')
  .then(data => {
    response.sendRespond(res, data);
    next();
  })
  .catch(error => {
    response.handleError(res, data);
    next();
  });
}

export async function updateConference(req, res, next) {
  if (req.user && req.body) {
    if (_.isEqual(req.user.role, 'ROLE_EDITOR')) {
      let updateConferenceData = {
        name: req.body.name,
        venue: req.body.venue,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        description: req.body.description
      };

      await Conference.findByIdAndUpdate(req.body._id, updateConferenceData)
      .then(data => {
        response.sendRespond(res, data);
        next();
      })
      .catch(error => {
        response.handleError(res, error.message);
        next();
      });
    } else {
      response.handleError(res, 'Only Editor can update the conference details');
      next();
    }
  }
}

export async function deleteConference(req, res, next) {
  if (req.user && req.params && req.params.id) {
    if (_.isEqual(req.user.role, 'ROLE_EDITOR')) {
      await Conference.findByIdAndDelete(req.params.id)
      .then(data => {
        response.sendRespond(res, data);
        next();
      })
      .catch(error => {
        response.handleError(res, error.message);
        next();
      });
    } else {
      response.handleError(res, 'Only Editor can update the conference details');
      next();
    }
  }
}

export async function updateConferenceStatus(req, res, next) {
  if (req.user && req.body) {
    if (_.isEqual(req.user.role, 'ROLE_ADMIN')) {
      let statusData = {
        status: req.body.status
      };

      await Conference.findByIdAndUpdate(req.body._id, statusData)
      .then(data => {
        response.sendRespond(res, data);
        next();
      })
      .catch(error => {
        response.handleError(res, error.message);
        next();
      });
    } else {
      response.handleError(res, 'Only Admin can change the status');
      next();
    }
  }
}