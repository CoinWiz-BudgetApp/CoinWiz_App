const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

type CreateLinkTokenResponse = {
  link_token: string;
};

type ExchangePublicTokenResponse = {
  access_token: string;
  item_id: string;
};

function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error(
      'Missing EXPO_PUBLIC_API_BASE_URL. Set it in your .env file to your backend URL.'
    );
  }

  return API_BASE_URL.replace(/\/$/, '');
}

async function postJson<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed (${response.status}): ${errorText}`);
  }

  return (await response.json()) as T;
}

export async function createPlaidLinkToken(userId: string) {
  return postJson<CreateLinkTokenResponse>('/plaid/create-link-token', { userId });
}

export async function exchangePlaidPublicToken(publicToken: string) {
  return postJson<ExchangePublicTokenResponse>('/plaid/exchange-public-token', {
    publicToken,
  });
}
