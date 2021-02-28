import { DRAWER } from '../constants/headerConstants';

export const drawerReducer = (state = false, action) => {
  switch (action.type) {
    case DRAWER:
      return action.payload;

    default:
      return state;
  }
};
