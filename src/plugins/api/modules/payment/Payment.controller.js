import response from '../../../../lib/response.handler';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Notification from '../user/Notification.model'
import User from '../user/User.model.js'
import Conference from '../conference/Conference.model'
import Payment from '../payment/Payment.model'

export async function chargeAmount(req, res, next) {
  if (req.user && req.body) {
    
    let { status } = await stripe.charges.create({
        amount: req.body.amount,
        currency: 'LKR',
        source: req.body.token
      })

      // Add Payment Details to Payment Collection
      let paymentDetail ={
        conference: req.body.conference_id,
        attendee: req.user._id,
        amount: req.body.amount,
        source: req.body.token
      }

      let conference_name = ""

      let payment = new Payment(paymentDetail);
      await payment.save()
      .then(async () => {
        let data = await Conference.findById(req.body.conference_id);
        conference_name = data.name;
      })
      .then(async () =>{
        let notificationDetail ={
          conference: req.body.conference_id,
          message: req.body.message + " " +conference_name,
          to: req.user._id,
          isarchive: false
        }
        let notification = new Notification(notificationDetail);
        await notification.save();
      })
      .then(async() => {
        await Conference.findByIdAndUpdate({ _id: req.body.conference_id }, { $push: {atendees: req.user._id}})
      })
      .then(async() => {
        await User.findByIdAndUpdate({ _id: req.user._id }, { $push: { attending_conferences: req.body.conference_id }})
      })
      .then(() => {
        res.status(200).send({message: 'Conference Added Successfully: ' + req.body.conference_id });
        return;
      })
      .catch(error => {
        res.status(400).send({message: 'Error Occured: ' + req.body.conference_id });
        return;
      });
  }
}