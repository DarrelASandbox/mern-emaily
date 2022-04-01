const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // `source` is obtained with Stripe.js;
    // see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'sgd',
      source: 'tok_mastercard',
      description: '$5 for 5 credits',
    });

    // req.user is assigned by passportjs
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
