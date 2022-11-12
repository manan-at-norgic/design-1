import { MESSAGE__ } from "../type";

export const select_messages = (data) => async (dispatch) => {
  dispatch({
    type: MESSAGE__,
    payload: data,
  });
};
