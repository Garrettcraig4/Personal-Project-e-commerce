import { createStore, applyMiddleware } from "redux";
import reducers from "./ducks/index";
import promiseMiddleware from "redux-promise-middleware";

const store = createStore(reducers, applyMiddleware(promiseMiddleware()));

export default store;
