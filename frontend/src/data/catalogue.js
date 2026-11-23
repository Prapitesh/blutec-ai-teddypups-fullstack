import puppyData from './puppies.json';

export const available = puppyData.filter(p => p.status === 'AVAILABLE');
export { puppyData };
