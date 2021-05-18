import User from './User.model';
import response from '../../../../lib/response.handler';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

// create new user - public
export async function createUser(req, res, next) {
  if (req.body && req.body.username) {
    let username = req.body.username;
    let user = await User.findOne({ username });
    if (user) {
      response.handleError(res, 'Username already taken');
      return;
    }
    const newUser = new User(req.body);
    await newUser.save();
    const token = await newUser.generateAuthToken();
    let responseData = {
      user_id: newUser._id,
      username: newUser.username,
      token: token,
      role: newUser.role
    }
    response.sendRespond(res, responseData);
    next();
  } else {
    response.handleError(res, 'Username is required');
  }
}

// login user - public
export async function userLogin(req, res, next) {
  if (req.body && req.body.username && req.body.password) {
    let { username, password } = req.body;
    let user = null;

    try {
      user = await User.findByUsernamePassword(username, password);
    } catch (error) {
      response.handleError(res, error.message);
    }

    if (user) {
      const token = await user.generateAuthToken();
      let responseData = {
        user_id: user._id,
        username: user.username,
        token: token,
        role: user.role
      };
      response.sendRespond(res, responseData);
      next();
    } else {
      response.sendNotFound(res);
    }
  } else {
    response.handleError(res, 'Username password required')
  }
}

// update user account - private
export async function updateUserAccount(req, res, next) {
  if (req.body) {
    let updateData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: await bcrypt.hash(req.body.password, 8),
      phonenumber: req.body.phonenumber,
      imageurl: req.body.imageurl,
      description: req.body.description,
      role: req.body.role
    };
    const user = await User.findByIdAndUpdate(req.user.id, updateData);
    response.sendRespond(res, user);
    next();
  } else {
    response.handleError(res, 'Please provide necessary fields');
  }
}

// delete user account - private
export async function deleteUserAccount(req, res, next) {
  const user = await User.findByIdAndDelete(req.user.id);
  response.sendRespond(res, user);
  next();
}

// get user account - private
export function getUserAccount(req, res, next) {
  if (req.user) {
    response.sendRespond(res, req.user);
    next();
  } else {
    response.sendNotFound(res);
  }
}

// get all admin accounts | private | admin only
export async function getAdminAccounts(req, res, next) {
  if (_.isEqual(req.user.role, 'ROLE_ADMIN')) {
    const adminAccounts = await User.find({ role: 'ROLE_ADMIN' });
    if (adminAccounts) {
      response.sendRespond(res, adminAccounts);
      next();
    } else {
      response.handleError(res, 'No admin accounts');
    }
  }
}

// get all reviwer accounts | private | admin only
export async function getReviewerAccounts(req, res, next) {
  if (_.isEqual(req.user.role, 'ROLE_ADMIN')) {
    const reviewerAccounts = await User.find({ role: 'ROLE_REVIEWER' });
    if (reviewerAccounts) {
      response.sendRespond(res, reviewerAccounts);
      next();
    } else {
      response.sendNotFound(res);
    }
  }
}

// get all editor accounts | private | admin only
export async function getEditorAccounts(req,res, next) {
  if (_.isEqual(req.user.role, 'ROLE_ADMIN')) {
    const editorAccounts = await User.find({ role: 'ROLE_EDITOR' });
    if (editorAccounts) {
      response.sendRespond(res, editorAccounts);
      next();
    } else {
      response.sendNotFound(res);
    }
  }
}

// get all researcher accounts | private | admin only
export async function getResearcherAccounts(req, res, next) {
  if (_.isEqual(req.user.role, 'ROLE_ADMIN')) {
    const researcherAccounts = await User.find({ role: 'ROLE_RESEARCHER' });
    if (researcherAccounts) {
      response.sendRespond(res, researcherAccounts);
      next();
    } else {
      response.sendNotFound(res);
    }
  }
}

// get all presenter accounts | private | admin only
export async function getPresenterAccounts(req, res, next) {
  if (_.isEqual(req.user.role, 'ROLE_ADMIN')) {
    const presenterAccounts = await User.find({ role: 'ROLE_PRESENTER' });
    if (presenterAccounts) {
      response.sendRespond(res, presenterAccounts);
      next();
    } else {
      response.sendNotFound(res);
    }
  }
}

// get all atendee accounts | private | admin only
export async function getAtendeeAccounts(req, res, next) {
  if (_.isEqual(req.user.role, 'ROLE_ADMIN')) {
    const atendeeAccounts = await User.find({ role: 'ROLE_ATENDEE' });
    if (atendeeAccounts) {
      response.sendRespond(res, atendeeAccounts);
      next();
    } else {
      response.sendNotFound(res);
    }
  }
}