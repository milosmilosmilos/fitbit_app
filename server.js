const express = require('express');
const path = require('path');

const tokenManager = require('./token');
const fitbit = require('./fitbit');

const app = express();
const PORT = 3000;

function log(...args) {
  console.log('[SERVER]', ...args);
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/auth', (req, res) => {
  res.redirect(tokenManager.getAuthUrl());
});

app.get('/callback', async (req, res) => {
  try {
    await tokenManager.exchangeCodeForToken(req.query.code);
    res.send('Auth OK');
  } catch (e) {
    log('OAuth error', e.message);
    res.status(500).send(e.message);
  }
});

app.get('/api/:type', async (req, res) => {
  try {
    const token = await tokenManager.getValidAccessToken();
    if (!token) return res.status(401).send('Login first: /auth');

    const { type } = req.params;
    log('API', type, req.query);

    let data;

    if (type === 'heartrate') {
      data = await fitbit.heartrate(req.query.date, req.query.detail, token);
    }
    else if (type === 'spo2') {
      data = await fitbit.spo2(req.query.date, token);
    }
    else if (type === 'sleep') {
      data = await fitbit.sleep(req.query.date, token);
    }
    else if (type === 'ecg') {
      data = await fitbit.ecgList(token, req.query.date);
    }
    else {
      return res.status(400).send('Invalid API');
    }

    if (req.query.download === '1') {
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${type}.json`
      );
    }

    res.json(data);

  } catch (e) {
    log('API ERROR', e.message);
    res.status(500).send(e.message);
  }
});


app.listen(PORT, '0.0.0.0', () => {
  log(`Running on http://localhost:${PORT}`);
});
