const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  /* Password check */
  const pw = req.headers['x-admin-password'];
  if (!pw || pw !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    /* Fetch up to 100 most recent succeeded payment intents */
    const list = await stripe.paymentIntents.list({ limit: 100 });

    const orders = list.data
      .filter(pi => pi.status === 'succeeded')
      .map(pi => {
        let items = [];
        try { items = JSON.parse(pi.metadata.items || '[]'); } catch {}

        return {
          id:       pi.id,
          date:     pi.created,
          customer: {
            name:  pi.metadata.customer_name || '—',
            email: pi.receipt_email          || '—',
          },
          shipping: pi.metadata.shipping_address || '—',
          items,
          amount:   pi.amount / 100,
          currency: pi.currency.toUpperCase(),
          status:   pi.status,
        };
      });

    /* Summary stats */
    const total   = orders.reduce((s, o) => s + o.amount, 0);
    const todayMs = Date.now() - 86400000;
    const today   = orders.filter(o => o.date * 1000 > todayMs).reduce((s, o) => s + o.amount, 0);
    const avg     = orders.length ? total / orders.length : 0;

    res.status(200).json({ orders, stats: { total, today, avg, count: orders.length } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
