import { GET_QOUTES } from "../type";

const initialState = "";

const quotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QOUTES:
      return (state = action.payload);
    default:
      return state;
  }
};

export default quotesReducer;
