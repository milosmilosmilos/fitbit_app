const fetch = require('node-fetch');

function log(...args) {
  console.log('[FITBIT]', ...args);
}

async function call(url, token) {
  log('GET', url);
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
  return JSON.parse(text);
}

function normalizeDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Invalid date format: ${date}`);
  }
  return date;
}

module.exports = {

  // HEART RATE — INTRADAY SUPPORTED
  heartrate: (date, detail, token) => {
    date = normalizeDate(date);
    detail = detail || '1sec'; // 1sec | 1min
    return call(
      `https://api.fitbit.com/1/user/-/activities/heart/date/${date}/1d/${detail}.json`,
      token
    );
  },

  // SPO2 — NO INTRADAY
  spo2: (date, token) => {
    date = normalizeDate(date);
    return call(
      `https://api.fitbit.com/1/user/-/spo2/date/${date}.json`,
      token
    );
  },

  // SLEEP — DATE ONLY
  sleep: (date, token) => {
    date = normalizeDate(date);
    return call(
      `https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`,
      token
    );
  },

  ecgList: (token, date) => {
    let url = 'https://api.fitbit.com/1/user/-/ecg/list.json';
    date = normalizeDate(date);
    const params = new URLSearchParams();
    params.append('afterDate', date);
    params.append('sort', 'asc');
    params.append('offset', 0);
    params.append('limit', 10);
    url += '?' + params.toString();
    return call(url, token);
  },
};
