import {
  EPISODE_LIST_REQUEST,
  EPISODE_LIST_SUCCESS,
  EPISODE_LIST_FAIL,
  EPISODE_DETAILS_REQUEST,
  EPISODE_DETAILS_FAIL,
  EPISODE_DETAILS_SUCCESS,
} from '../constants/episodeConstants';

export const episodeList = (name = '', season = 0, launchFilter = false) => async (
  dispatch,
  getState,
) => {
  const convertNumSeason =
    season !== 0
      ? season.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
      : '';

  let urlPage = `https://rickandmortyapi.com/api/episode?name=${name}&episode=S${convertNumSeason}`;

  const nextPage = getState().episodeList?.info?.next;

  if (nextPage && !launchFilter) {
    urlPage = nextPage;
  } else if (nextPage === null && !launchFilter) {
    return;
  } else {
    dispatch({ type: EPISODE_LIST_REQUEST });
  }

  try {
    const response = await fetch(urlPage);

    const json = await response.json();

    if (!response.ok) {
      dispatch({
        type: EPISODE_LIST_FAIL,
        payload: {
          message: json.error,
        },
      });
      return;
    }

    dispatch({
      type: EPISODE_LIST_SUCCESS,
      payload: {
        info: json.info,
        results: json.results,
        launchFilter,
      },
    });
  } catch (error) {
    dispatch({
      type: EPISODE_LIST_FAIL,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const episodeDetails = (id) => async (dispatch) => {
  dispatch({ type: EPISODE_DETAILS_REQUEST });

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
    const json = await response.json();
    if (!response.ok) {
      dispatch({
        type: EPISODE_DETAILS_FAIL,
        payload: {
          message: json.error,
        },
      });
      return;
    }

    dispatch({
      type: EPISODE_DETAILS_SUCCESS,
      payload: json,
    });
  } catch (error) {
    dispatch({
      type: EPISODE_DETAILS_FAIL,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};
