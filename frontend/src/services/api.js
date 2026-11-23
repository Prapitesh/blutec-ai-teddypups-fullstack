const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export async function fetchCatalogue(signal) {
  const response = await fetch(API_BASE + '/api/puppies', { signal });
  if (!response.ok) throw new Error('Catalogue API unavailable (' + response.status + ')');
  const puppies = await response.json();
  if (!Array.isArray(puppies)) throw new Error('Invalid catalogue data');
  return puppies;
}

export async function submitEnquiry(data) {
  const response = await fetch(API_BASE + '/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  let payload = null;
  try { payload = await response.json(); } catch { /* Response may have no JSON body */ }
  if (!response.ok) throw new Error(payload?.message || 'Please check your details and try again.');
  return payload;
}
