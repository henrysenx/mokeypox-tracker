import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

import trackerReducer from "./reducers";

const middleware = [reduxThunk];

const reducers = combineReducers({
  TrackerReducer: trackerReducer,
});

export const myStore = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
