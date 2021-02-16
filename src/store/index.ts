import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { vesselReducer } from './vessels/reducers';

export const rootReducer = combineReducers({
  vessels: vesselReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
export type RootState = ReturnType<typeof rootReducer>;