import { DRAWER } from '../constants/headerConstants';

export const drawer = (state) => {
  return { type: DRAWER, payload: state };
};
