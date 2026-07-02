const Stripe = require('stripe');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method not allowed' }) };

  if (!process.env.STRIPE_SECRET_KEY) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: 'STRIPE_SECRET_KEY is not set' }) };
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { amountAud, customerEmail, customerName, items, shippingAddress } = JSON.parse(event.body);

    if (!amountAud || amountAud < 0.5) {
      return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Invalid amount' }) };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountAud * 100),
      currency: 'aud',
      receipt_email: customerEmail || undefined,
      description: 'NovaBuild order',
      metadata: {
        customer_name:    customerName    || '',
        shipping_address: shippingAddress || '',
        items:            JSON.stringify(items || []),
      },
      automatic_payment_methods: { enabled: true },
    });

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (err) {
    console.error('Stripe error:', err.message);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
