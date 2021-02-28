import {
  ADD_TO_WATCH_LIST_FAIL,
  ADD_TO_WATCH_LIST_REQUEST,
  ADD_TO_WATCH_LIST_SUCCESS,
  CHECK_BOX_WATCH_LIST,
  CLEAR_WATCH_LIST,
  REMOVE_EPISODE_FROM_WATCH_LIST,
} from '../constants/watchListConstants';

export const watchListReducer = (
  state = {
    loading: true,
    info: {
      watched: 0,
      watch: 0,
    },
  },
  action,
) => {
  switch (action.type) {
    case ADD_TO_WATCH_LIST_REQUEST:
      return { ...state, loading: true, error: '', changed: false };

    case ADD_TO_WATCH_LIST_SUCCESS:
      const newEpisode = action.payload;
      const existEpisode = state.episodes.find((episode) => episode.id === newEpisode.id);

      if (existEpisode) {
        return {
          ...state,
          error: { message: `We already added the episode ${newEpisode.id}` },
          episodes: state.episodes.map((itemEpisode) =>
            itemEpisode === existEpisode ? newEpisode : itemEpisode,
          ),
        };
      } else {
        const episodes = state.episodes ? [...state.episodes, action.payload] : [action.payload];
        return {
          ...state,
          changed: !state.changed,
          error: null,
          loading: false,
          episodes: episodes,
        };
      }

    case ADD_TO_WATCH_LIST_FAIL:
      return { ...state, changed: !state.changed, loading: false, error: action.payload };

    case CHECK_BOX_WATCH_LIST:
      const episodeId = action.payload;
      const findEpisode = state.episodes.find((episode) => episode.id === episodeId);
      findEpisode.watched = findEpisode.watched ? false : true;

      return { ...state, changed: !state.changed };

    case REMOVE_EPISODE_FROM_WATCH_LIST:
      const removeEpisodeId = action.payload;
      return {
        ...state,
        changed: !state.changed,
        episodes: state.episodes.filter((episode) => episode.id !== removeEpisodeId),
      };

    case CLEAR_WATCH_LIST:
      return {
        loading: false,
        episodes: [],
      };

    default:
      return state;
  }
};
