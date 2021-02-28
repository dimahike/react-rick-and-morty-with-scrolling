import {
  CHARACTER_DETAILS_FAIL,
  CHARACTER_DETAILS_REQUEST,
  CHARACTER_DETAILS_RESET,
  CHARACTER_DETAILS_SUCCESS,
  CHARACTER_LIST_FAIL,
  CHARACTER_LIST_REQUEST,
  CHARACTER_LIST_SUCCESS,
} from '../constants/characterConstants';

export const characterListReducer = (
  state = { loading: true, characters: [], info: {} },
  action,
) => {
  switch (action.type) {
    case CHARACTER_LIST_REQUEST:
      return { ...state, loading: true };

    case CHARACTER_LIST_SUCCESS:
      const characterList =
        state.characters?.length > 0 && !action.payload.launchFilter
          ? [...state.characters, ...action.payload.results]
          : action.payload.results;

      return {
        loading: false,
        characters: characterList,
        info: action.payload.info,
      };

    case CHARACTER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const characterDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case CHARACTER_DETAILS_REQUEST:
      return { loading: true };

    case CHARACTER_DETAILS_SUCCESS:
      return { loading: false, character: action.payload };

    case CHARACTER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CHARACTER_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};
