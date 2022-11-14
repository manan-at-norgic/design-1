import { CURRENT_GROUP } from "../type";

export const select_current_group = (data) => async (dispatch) => {
  dispatch({
    type: CURRENT_GROUP,
    payload: data,
  });
};
