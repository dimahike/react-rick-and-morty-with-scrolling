import {
  EPISODE_DETAILS_FAIL,
  EPISODE_DETAILS_REQUEST,
  EPISODE_DETAILS_RESET,
  EPISODE_DETAILS_SUCCESS,
  EPISODE_LIST_FAIL,
  EPISODE_LIST_REQUEST,
  EPISODE_LIST_SUCCESS,
} from '../constants/episodeConstants.js';

export const episodeListReducer = (state = { loading: true, episodes: [], info: {} }, action) => {
  switch (action.type) {
    case EPISODE_LIST_REQUEST:
      return { ...state, loading: true };

    case EPISODE_LIST_SUCCESS:
      const episodes =
        state.episodes?.length > 0 && !action.payload.launchFilter
          ? [...state.episodes, ...action.payload.results]
          : action.payload.results;

      return {
        loading: false,
        info: action.payload.info,
        episodes: episodes,
      };

    case EPISODE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const episodeDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case EPISODE_DETAILS_REQUEST:
      return { loading: true };

    case EPISODE_DETAILS_SUCCESS:
      return { loading: false, episode: action.payload };

    case EPISODE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case EPISODE_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};
