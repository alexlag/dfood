import { httpGet } from './http';

export function getMenuItems() {
  return httpGet('/today');
}

