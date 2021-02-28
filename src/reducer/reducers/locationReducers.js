import {
  LOCATION_DETAILS_FAIL,
  LOCATION_DETAILS_REQUEST,
  LOCATION_DETAILS_RESET,
  LOCATION_DETAILS_SUCCESS,
  LOCATION_LIST_FAIL,
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
} from '../constants/locationConstants';

export const locationListReducer = (state = { loading: true, locations: [], info: {} }, action) => {
  switch (action.type) {
    case LOCATION_LIST_REQUEST:
      return { ...state, loading: true };

    case LOCATION_LIST_SUCCESS:
      const locations =
        state.locations?.length > 0 && !action.payload.launchFilter
          ? [...state.locations, ...action.payload.results]
          : action.payload.results;

      return {
        loading: false,
        info: action.payload.info,
        locations: locations,
      };
    case LOCATION_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const locationDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case LOCATION_DETAILS_REQUEST:
      return { loading: true };

    case LOCATION_DETAILS_SUCCESS:
      return { loading: false, location: action.payload };

    case LOCATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case LOCATION_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};
