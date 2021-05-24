import response from '../../../../lib/response.handler';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Notification from '../user/Notification.model'
import User from '../user/User.model.js'
import Conference from '../conference/Conference.model'

export async function changeAmount(req, res, next) {
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'LKR',
      source: req.body.token
    })

    // Add Payment Details to Payment Collection
    
    let paymentDetail ={
      conference: req.body.conference_id,
      attendee: req.body.attendee_id,
      amount: status.amount,
      source: status.source
    }

    let payment = new Payment(paymentDetail);
    await payment.save()
    .then(() => {
      response.sendRespond(res, payment);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });

    // Adding details to Notification collection

    let conference_name = ""

    await Conference.findById(req.body.conference_id)
    .then(data => {
      conference_name = data.name;
      response.sendRespond(res, data);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });

    let notificationDetail ={
      conference: req.body.conference_id,
      workshop: "",
      resource: "",
      from: "",
      message: `Your payment has been successful and now you can attend the Conference `+conference_name,
      to: req.body.attendee_id,
      isarchive: false
    }

    let notification = new Notification(notificationDetail);
    await notification.save()
    .then(() => {
      response.sendRespond(res, notification);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });

    // ADD to the Conference Collection with Conference ID and User ID for attendees array

    await Conference.findByIdAndUpdate({ _id: req.body.conference_id }, { $push: {atendees: req.body.attendee_id}})
    .then(data => {
      response.sendRespond(res, data);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });

    // ADD to the User Collection with Conference ID for attending conferences array and User ID

    await User.findByIdAndUpdate({_id: req.body.attendee_id}, { $push: {attending_conferences: req.body.conference_id}})
    .then(data => {
      response.sendRespond(res, data);
      next();

    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });

  } catch (error) {
    response.handleError(res, error.message);
    next();
  }

}