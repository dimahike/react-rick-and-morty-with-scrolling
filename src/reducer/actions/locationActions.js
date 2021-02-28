import {
  LOCATION_LIST_REQUEST,
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_FAIL,
  LOCATION_DETAILS_REQUEST,
  LOCATION_DETAILS_FAIL,
  LOCATION_DETAILS_SUCCESS,
} from '../constants/locationConstants.js';

export const locationList = (name = '', type = '', dimension = '', launchFilter = false) => async (
  dispatch,
  getState,
) => {
  let urlPage = `https://rickandmortyapi.com/api/location?name=${name}&type=${type}&dimension=${dimension}`;

  const nextPage = getState().locationList?.info?.next;

  if (nextPage && !launchFilter) {
    urlPage = nextPage;
  } else if (nextPage === null && !launchFilter) {
    return;
  } else {
    dispatch({ type: LOCATION_LIST_REQUEST });
  }

  try {
    const response = await fetch(urlPage);
    const json = await response.json();
    if (!response.ok) {
      dispatch({
        type: LOCATION_LIST_FAIL,
        payload: {
          message: json.error,
        },
      });
      return;
    }

    dispatch({
      type: LOCATION_LIST_SUCCESS,
      payload: {
        info: json.info,
        results: json.results,
        launchFilter,
      },
    });
  } catch (error) {
    dispatch({
      type: LOCATION_LIST_FAIL,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const locationDetails = (id) => async (dispatch) => {
  dispatch({ type: LOCATION_DETAILS_REQUEST });

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
    const json = await response.json();
    if (!response.ok) {
      dispatch({
        type: LOCATION_DETAILS_FAIL,
        payload: {
          message: json.error,
        },
      });
      return;
    }

    dispatch({
      type: LOCATION_DETAILS_SUCCESS,
      payload: json,
    });
  } catch (error) {
    dispatch({
      type: LOCATION_DETAILS_FAIL,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
