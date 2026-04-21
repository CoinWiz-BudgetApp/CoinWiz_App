
require('dotenv').config();
console.log('CWD:', process.cwd());
console.log('ENV PATH TEST:', process.env.PLAID_CLIENT_ID);

const http = require('http');
const { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } = require('plaid');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PORT = Number(process.env.PORT || 3000);

if (!PLAID_CLIENT_ID || !PLAID_SECRET) {
  console.error('Missing PLAID_CLIENT_ID or PLAID_SECRET in environment.');
  process.exit(1);
}

const plaidClient = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
        'PLAID-SECRET': PLAID_SECRET,
      },
    },
  })
);

function writeJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(body));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return writeJson(res, 204, {});
  }

  if (req.method !== 'POST') {
    return writeJson(res, 404, { error: 'Not found' });
  }

  try {
    if (req.url === '/plaid/create-link-token') {
      const body = await parseBody(req);
      const userId = String(body.userId || 'coinwiz-user');

      const response = await plaidClient.linkTokenCreate({
        user: { client_user_id: userId },
        client_name: 'CoinWiz',
        products: [Products.Transactions],
        country_codes: [CountryCode.Us],
        language: 'en',
      });

      return writeJson(res, 200, { link_token: response.data.link_token });
    }

    if (req.url === '/plaid/exchange-public-token') {
      const body = await parseBody(req);
      const publicToken = String(body.publicToken || '');
      if (!publicToken) {
        return writeJson(res, 400, { error: 'publicToken is required' });
      }

      const response = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });
      return writeJson(res, 200, {
        access_token: response.data.access_token,
        item_id: response.data.item_id,
      });
    }

    return writeJson(res, 404, { error: 'Not found' });
  } catch (error) {
    const plaidError = error && error.response && error.response.data ? error.response.data : null;
    return writeJson(res, 500, {
      error: plaidError || (error instanceof Error ? error.message : 'Server error'),
    });
  }
});

server.listen(PORT, () => {
  console.log(`Plaid sandbox server listening on http://localhost:${PORT}`);
});
