const Stripe = require('stripe');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, x-admin-password',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: CORS, body: '' };
  if (event.httpMethod !== 'GET') return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method not allowed' }) };

  const pw = event.headers['x-admin-password'];
  if (!pw || pw !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: 'Unauthorized' }) };
  }

  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const list = await stripe.paymentIntents.list({ limit: 100 });

    const orders = list.data
      .filter(pi => pi.status === 'succeeded')
      .map(pi => {
        let items = [];
        try { items = JSON.parse(pi.metadata.items || '[]'); } catch {}
        return {
          id:       pi.id,
          date:     pi.created,
          customer: { name: pi.metadata.customer_name || '—', email: pi.receipt_email || '—' },
          shipping: pi.metadata.shipping_address || '—',
          items,
          amount:   pi.amount / 100,
          currency: pi.currency.toUpperCase(),
          status:   pi.status,
        };
      });

    const total   = orders.reduce((s, o) => s + o.amount, 0);
    const todayMs = Date.now() - 86400000;
    const today   = orders.filter(o => o.date * 1000 > todayMs).reduce((s, o) => s + o.amount, 0);
    const avg     = orders.length ? total / orders.length : 0;

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders, stats: { total, today, avg, count: orders.length } }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
