import test from 'node:test';
import assert from 'node:assert/strict';
import puppyData from '../src/data/puppies.json' with { type: 'json' };
import { filterPuppies, initialFilters } from '../src/utils/catalogue.js';

const available = puppyData.filter(p => p.status === 'AVAILABLE');

test('catalogue snapshot is complete and IDs are unique', () => {
  assert.equal(puppyData.length,42);
  assert.equal(available.length,15);
  assert.equal(puppyData.filter(p=>p.status==='GONE_HOME').length,27);
  assert.equal(new Set(puppyData.map(p=>p.slug)).size,puppyData.length);
});
test('default filters return all available puppies', () => {
  assert.equal(filterPuppies(available, initialFilters).length,15);
});
test('search supports trimmed case-insensitive queries', () => {
  assert.deepEqual(filterPuppies(available,{...initialFilters,search:'  MAX  '}).map(p=>p.name),['Max']);
});
test('Korean teacup category uses the breed value', () => {
  const items=filterPuppies(available,{...initialFilters,location:'Korean Teacup'});
  assert.ok(items.length>0);
  assert.ok(items.every(p=>p.breed.toLowerCase().includes('korean teacup')));
});
test('breed, gender and search filters combine', () => {
  const items=filterPuppies(available,{...initialFilters,breed:'Maltipoo',gender:'Boy',search:'Max'});
  assert.equal(items.length,1);
  assert.equal(items[0].slug,'maltipoo-max-male');
});
test('resetting all filters restores the full list after empty results', () => {
  const none=filterPuppies(available,{...initialFilters,location:'Korean Teacup',breed:'Shih Tzu'});
  assert.equal(none.length,0);
  assert.equal(filterPuppies(available,initialFilters).length,15);
});
test('missing description does not crash search', () => {
  assert.equal(filterPuppies([{name:'Pup',breed:'Maltipoo',gender:'Girl'}],initialFilters).length,1);
});
