import { IS_LOGGED_IN } from "../type";

const initialState = {
  users: [],
  isLoggedIn: false,
};

const signIn = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOGGED_IN:
      state = { ...state, isLoggedIn: action.payload };
      return state;
    default:
      return state;
  }
};

export default signIn;
