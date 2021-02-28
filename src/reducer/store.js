import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { characterDetailsReducer, characterListReducer } from './reducers/characterReducers';
import { episodeDetailsReducer, episodeListReducer } from './reducers/episodeReducers';
import { drawerReducer } from './reducers/headerReducers';
import { locationDetailsReducer, locationListReducer } from './reducers/locationReducers';
import { watchListReducer } from './reducers/watchListReducers';

const initialState = {
  drawer: false,
  watchList: {
    episodes: localStorage.getItem('watchList')
      ? JSON.parse(localStorage.getItem('watchList'))
      : [],
  },
};
localStorage.getItem('watchList');
const reducer = combineReducers({
  drawer: drawerReducer,
  characterList: characterListReducer,
  characterDetails: characterDetailsReducer,
  episodeList: episodeListReducer,
  episodeDetails: episodeDetailsReducer,
  locationList: locationListReducer,
  locationDetails: locationDetailsReducer,
  watchList: watchListReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
