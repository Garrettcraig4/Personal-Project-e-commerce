import axios from "axios";

const GETPRODUCTS = "GETPRODUCTS";

export function getProducts() {
  return {
    type: GETPRODUCTS,
    payload: axios
      .request({ url: `/api/Products` })
      .then(response => response.data)
      .catch(err => err.errMessage)
  };
}
const initialState = {
  products: [],
  isLoading: false,
  didErr: false,
  errMessage: "rip"
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GETPRODUCTS}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GETPRODUCTS}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        products: action.payload
      });
    case `${GETPRODUCTS}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didErr: true
      });
    default:
      return state;
  }
}
