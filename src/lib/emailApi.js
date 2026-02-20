const API_BASE = import.meta.env.VITE_API_URL || '';

async function apiFetch(url, data) {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(json.error || `Erreur ${res.status}`);
    }
    return json;
  } catch (err) {
    const isNetworkError = !err.message || err.name === 'TypeError' ||
      /fetch|network|refused|failed/i.test(err.message);
    if (isNetworkError) {
      throw new Error('Serveur API indisponible. Lancez "npm run server" dans un autre terminal, ou "npm run dev:full".');
    }
    throw err;
  }
}

export async function sendContactEmail(data) {
  return apiFetch('/api/send-contact', data);
}

export async function sendInvestorEmail(data) {
  return apiFetch('/api/send-investor', data);
}
