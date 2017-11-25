import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import searchGithubReducer from '../reducers/searchGithubReducer';
import detailsGithubReducer from '../reducers/detailsGithubReducer';
import labelGithubReducer from '../reducers/labelGithubReducer';

export const configureStore = () => {
  const reducer = combineReducers({
    searches: searchGithubReducer,
    details: detailsGithubReducer,
    labels: labelGithubReducer
  });

  const store = createStore(
    reducer,
    compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
  );

  return store;
};
