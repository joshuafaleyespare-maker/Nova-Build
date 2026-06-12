const Stripe = require('stripe');

module.exports = async (req, res) => {
  /* Preflight */
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { amountAud, customerEmail, customerName, items, shippingAddress } = req.body;

    if (!amountAud || amountAud < 0.5) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountAud * 100),
      currency: 'aud',
      receipt_email: customerEmail || undefined,
      description: 'NovaBuild order',
      metadata: {
        customer_name:    customerName     || '',
        shipping_address: shippingAddress  || '',
        items:            JSON.stringify(items || []),
      },
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
