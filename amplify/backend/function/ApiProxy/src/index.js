const fetch = require('node-fetch');

exports.handler = async (event) => {
  const targetUrl = 'http://3.86.188.48:3001' + event.path;
  try {
    const upstreamRes = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: { ...event.headers, host: undefined },
      body: event.body
    });

    const body = await upstreamRes.text();
    return {
      statusCode: upstreamRes.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': upstreamRes.headers.get('content-type') || 'application/json'
      },
      body
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
