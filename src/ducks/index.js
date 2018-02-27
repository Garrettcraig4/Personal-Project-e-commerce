import { combineReducers } from "redux";
import productsReducer from "./getProducts";
import cartReducer from "./cart";

export default combineReducers({
  product: productsReducer,
  cart: cartReducer
});
