export const initialFilters = {
  search: '',
  location: 'Everywhere',
  breed: 'All breeds',
  gender: 'All',
};

export function filterPuppies(items, filters) {
  const { search = '', location = 'Everywhere', breed = 'All breeds', gender = 'All' } = filters;
  const term = search.trim().toLowerCase();
  return items.filter(p => {
    // Only the Korean teacup tag is actually represented in the reference snapshot.
    // The reference provides no reliable import-origin field. Avoid inventing one.
    if (location === 'Korean Teacup' && !String(p.breed || '').toLowerCase().includes('korean teacup')) return false;
    if (breed !== 'All breeds' && !String(p.breed || '').toLowerCase().includes(breed.toLowerCase())) return false;
    if (gender !== 'All' && !String(p.gender || '').toLowerCase().includes(gender.toLowerCase())) return false;
    const searchable = [p.name, p.breed, p.description].filter(Boolean).join(' ').toLowerCase();
    return !term || searchable.includes(term);
  });
}
