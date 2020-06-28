import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import app from "./Reducers/appReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ app });
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
