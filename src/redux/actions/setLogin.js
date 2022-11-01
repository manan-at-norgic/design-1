import { IS_LOGGED_IN } from "../type";

const setLogin = (data) => ({
  type: IS_LOGGED_IN,
  payload: data,
});

export const loggedIn = (data) => {
  return async (dispatch) => {
    dispatch(setLogin(data));
  };
};
