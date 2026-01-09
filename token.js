const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const TOKEN_PATH = path.resolve(config.token_file);
const REFRESH_MARGIN_MS = 60 * 1000;

function log(...args) {
  console.log('[TOKEN]', ...args);
}

function loadToken() {
  if (!fs.existsSync(TOKEN_PATH)) return null;
  return JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
}

function saveToken(token) {
  token.created_at = Date.now();
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
  log('Token saved');
}

function getAuthUrl() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.client_id,
    redirect_uri: config.redirect_uri,
    scope: config.scope.join(' ')
  });
  return `https://www.fitbit.com/oauth2/authorize?${params.toString()}`;
}

async function exchangeCodeForToken(code) {
  log('Exchanging auth code');
  const auth = Buffer.from(`${config.client_id}:${config.client_secret}`).toString('base64');

  const res = await fetch('https://api.fitbit.com/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.redirect_uri
    })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));

  saveToken(data);
  return data;
}

async function refreshToken(refresh_token) {
  log('Refreshing access token');
  const auth = Buffer.from(`${config.client_id}:${config.client_secret}`).toString('base64');

  const res = await fetch('https://api.fitbit.com/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));

  saveToken(data);
  return data;
}

async function getValidAccessToken() {
  let token = loadToken();
  if (!token) return null;

  const expiresAt = token.created_at + token.expires_in * 1000;
  const needsRefresh = Date.now() > expiresAt - REFRESH_MARGIN_MS;

  if (needsRefresh) {
    log('Token expired or near expiry');
    token = await refreshToken(token.refresh_token);
  }

  return token.access_token;
}

module.exports = {
  getAuthUrl,
  exchangeCodeForToken,
  getValidAccessToken
};
