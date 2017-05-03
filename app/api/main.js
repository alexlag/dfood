import { httpGet } from './http';

export function getMenuItems(params = {}) {
  const { day, month, year } = params;
  if (day && month && year) {
    return httpGet(`/history/${year}/${month}/${day}`);
  }
  return httpGet('/today');
}

export function history() {
  return httpGet('/history');
}
