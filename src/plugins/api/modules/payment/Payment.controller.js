import response from '../../../../lib/response.handler';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Notification from '../user/Notification.model'
import User from '../user/User.model.js'
import Conference from '../conference/Conference.model'
import Payment from '../payment/Payment.model'

export function chargeAmount(req, res, next) {
  if (req.user && req.body) {
    return new Promise((resolve, reject) => {
      let paymentDetail ={
        conference: req.body.conference_id,
        attendee: req.user._id,
        amount: '200',
        source: "Testing Source"
      };

      let payment = new Payment(paymentDetail);
      payment.save()
      .then(paymentInformation => {
        if (paymentInformation) {
          let conference = Conference.findById(req.body.conference_id);
          if (conference) {
            let notificationData ={
              conference: req.body.conference_id,
              message: "Your payment has been successful and now you can attend the Conference "+ conference.name,
              to: req.user._id,
              isarchive: false
            };
            let notification = new Notification(notificationData);
            notification.save()
            .then(notificationInformation => {
              if (notificationInformation) {
                let updateConference = Conference.findByIdAndUpdate({ _id: req.body.conference_id }, { $push: {atendees: req.user._id}});
                if (updateConference) {
                  let updateUser = User.findByIdAndUpdate({ _id: req.user._id }, { $push: { attending_conferences: req.body.conference_id }});
                  if (updateUser) {
                    let responseData = {
                      payment: notification,
                      notification: notification,
                      user: updateUser,
                      conference: conference
                    }
                    return resolve(notificationInformation);
                  } else {
                    return resolve(JSON.stringify(paymentInformation));
                  }
                } else {
                  return resolve({ paymentInformation, notificationInformation });
                }
              } else {
                return resolve({ paymentInformation });
              }
            })
            .catch(error => response.handleError(res, error.message));
          }
        } else {
          return resolve({ paymentInformation });
        }
      })
    })
    .then(paymentResponse => { 
      console.log(paymentResponse)
      response.sendRespond(res, paymentResponse)
    })
    .catch(error => { 
      console.log(error)
      response.handleError(res, error.message)
    });
  }
}