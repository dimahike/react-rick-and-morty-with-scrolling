import {
  ADD_TO_WATCH_LIST_FAIL,
  ADD_TO_WATCH_LIST_REQUEST,
  ADD_TO_WATCH_LIST_SUCCESS,
  CHECK_BOX_WATCH_LIST,
  CLEAR_WATCH_LIST,
  REMOVE_EPISODE_FROM_WATCH_LIST,
} from '../constants/watchListConstants';

export const addToWatchList = (id) => async (dispatch, getState) => {
  dispatch({ type: ADD_TO_WATCH_LIST_REQUEST });

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
    const json = await response.json();
    if (!response.ok) {
      dispatch({
        type: ADD_TO_WATCH_LIST_FAIL,
        payload: {
          message: json.error,
        },
      });
      return;
    }

    dispatch({
      type: ADD_TO_WATCH_LIST_SUCCESS,
      payload: json,
    });

    localStorage.setItem('watchList', JSON.stringify(getState().watchList.episodes));
  } catch (error) {
    dispatch({
      type: ADD_TO_WATCH_LIST_FAIL,
      payload: {
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      },
    });
  }
};

export const checkBoxWatcheList = (episodeId) => (dispatch, getState) => {
  dispatch({ type: CHECK_BOX_WATCH_LIST, payload: episodeId });
  localStorage.setItem('watchList', JSON.stringify(getState().watchList.episodes));
};

export const removeEpisodeFromWatchList = (episodeId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_EPISODE_FROM_WATCH_LIST, payload: episodeId });
  localStorage.setItem('watchList', JSON.stringify(getState().watchList.episodes));
};

export const clearWatchList = () => (dispatch, getState) => {
  dispatch({ type: CLEAR_WATCH_LIST });
  localStorage.setItem('watchList', JSON.stringify(getState().watchList.episodes));
};
