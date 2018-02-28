import axios from "axios";

const GETTOTAL = "GETTOTAL";
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

export function getTotalFromUserCart() {
  return {
    type: GETTOTAL,
    payload: axios
      .request({ url: `/api/GetTotal` })
      .then(response => {
        console.log(response.data[0].sum, "111111111111111111111");
        return response.data[0].sum;
      })
      .catch(err => err.errMessage)
  };
}

const initialState = {
  cart: [],
  isLoading: false,
  didErr: false,
  errMessage: "rip",
  total: 0
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
    case `${GETTOTAL}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GETTOTAL}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        total: action.payload
      });

    case `${GETTOTAL}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });

    default:
      return state;
  }
}
