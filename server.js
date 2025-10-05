const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5173;
const API_BASE = 'http://lb-prod-proy-134029330.us-east-1.elb.amazonaws.com:3001';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy simple: reenvía cualquier /api/* al load balancer
app.use('/api', async (req, res) => {
  const targetUrl = API_BASE + req.originalUrl;
  try {
    const upstreamRes = await fetch(targetUrl, {
      method: req.method,
      headers: { ...req.headers, host: undefined },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body)
    });

    res.status(upstreamRes.status);
    upstreamRes.headers.forEach((v, k) => {
      if (!['transfer-encoding','connection','keep-alive','proxy-authenticate','proxy-authorization','te','trailers','upgrade'].includes(k.toLowerCase())) {
        res.set(k, v);
      }
    });

    const text = await upstreamRes.text();
    try { res.send(JSON.parse(text)); } catch (e) { res.send(text); }
  } catch (err) {
    res.status(502).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`Frontend proxy running on http://localhost:${PORT}`));
