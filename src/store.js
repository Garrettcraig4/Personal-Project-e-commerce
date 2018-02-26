import { createStore, applyMiddleware } from "redux";
import users_reducer from "./ducks/cart";
import promiseMiddleware from "redux-promise-middleware";

const store = createStore(users_reducer, applyMiddleware(promiseMiddleware()));

export default store;
