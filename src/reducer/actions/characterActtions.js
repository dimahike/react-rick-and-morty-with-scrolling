import {
  CHARACTER_LIST_FAIL,
  CHARACTER_LIST_REQUEST,
  CHARACTER_LIST_SUCCESS,
  CHARACTER_DETAILS_FAIL,
  CHARACTER_DETAILS_REQUEST,
  CHARACTER_DETAILS_SUCCESS,
} from '../constants/characterConstants';

export const characterList = (
  nameFilter = '',
  speciesFilter = '',
  genderFilter = '',
  statusFilter = '',
  launchFilter = false,
) => async (dispatch, getState) => {
  let urlPage = `https://rickandmortyapi.com/api/character?name=${nameFilter}&species=${speciesFilter}&status=${statusFilter}&gender=${genderFilter}`;

  const nextPage = getState().characterList?.info?.next;

  if (nextPage && !launchFilter) {
    urlPage = nextPage;
  } else if (nextPage === null && !launchFilter) {
    return;
  } else {
    dispatch({ type: CHARACTER_LIST_REQUEST });
  }

  try {
    const response = await fetch(urlPage);
    const json = await response.json();
    if (!response.ok) {
      dispatch({
        type: CHARACTER_LIST_FAIL,
        payload: {
          message: json.error,
        },
      });
      return;
    }

    dispatch({
      type: CHARACTER_LIST_SUCCESS,
      payload: {
        results: json.results,
        info: json.info,
        launchFilter,
      },
    });
  } catch (error) {
    dispatch({
      type: CHARACTER_LIST_FAIL,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const characterDetails = (id) => async (dispatch) => {
  dispatch({ type: CHARACTER_DETAILS_REQUEST });

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const json = await response.json();
    if (!response.ok) {
      dispatch({
        type: CHARACTER_DETAILS_FAIL,
        payload: {
          message: json.error,
        },
      });
      return;
    }

    dispatch({
      type: CHARACTER_DETAILS_SUCCESS,
      payload: json,
    });
  } catch (error) {
    dispatch({
      type: CHARACTER_DETAILS_FAIL,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
