import response from '../../../../lib/response.handler';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function changeAmount(req, res, next) {
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'LKR',
      source: req.body.token
    })
    response.sendRespond(res, status);
    return;
  } catch (error) {
    response.handleError(res, error.message);
    return;
  }
}