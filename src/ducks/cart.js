import axios from "axios";

const GETTOTAL = "GETTOTAL";
const GETUSERCART = "GETUSERCART";
const GETUSERORDER = "GETUSERORDER";
const GETUSER = "GETUSER";
export function getUserCart() {
  console.log("fired");
  return {
    type: GETUSERCART,
    payload: axios
      .request({ url: `/api/Cart` })
      .then(response => {
        console.log(response.data, "usuer acar tad at ");
        return response.data;
      })

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

export function getUserOrder() {
  return {
    type: GETUSERORDER,
    payload: axios
      .request({ url: `/api/getUserOrder` })
      .then(response => response.data)
      .catch(err => err.errMessage)
  };
}
export function getUser() {
  console.log("hit");
  return {
    type: GETUSER,
    payload: axios.get("/api/getUser").then(response => response.data)
    //     .request({ url: `/api/getUser` })
    //     .then(response => response.data)
    //     .catch(err => err.errMessage)
  };
}
const initialState = {
  cart: [],
  isLoading: false,
  didErr: false,
  errMessage: "rip",
  total: 0,
  order: [],
  user: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GETUSERCART}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GETUSERCART}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        cart: action.payload.response,
        user: action.payload.requ.name
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

    case `${GETUSERORDER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GETUSERORDER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        order: action.payload
      });

    case `${GETUSERORDER}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });

    case `${GETUSER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GETUSER}_FULFILLED`:
      console.log(action.payload.length);
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload.name
      });

    case `${GETUSER}_REJECTED`:
      console.log("rejected hit");
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });

    default:
      return state;
  }
}
