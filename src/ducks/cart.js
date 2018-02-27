import axios from "axios";

const GETUSERCART = "GETUSERCART";

export function getUserCart() {
  return {
    type: GETUSERCART,
    payload: axios
      .request({ url: `/api/Cart` })
      .then(response => response.data)
      .catch(err => err.errMessage)
  };
}

const initialState = {
  cart: [],
  isLoading: false,
  didErr: false,
  errMessage: "rip"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GETUSERCART}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GETUSERCART}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        cart: action.payload
      });
    case `${GETUSERCART}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });
    default:
      return state;
  }
}
