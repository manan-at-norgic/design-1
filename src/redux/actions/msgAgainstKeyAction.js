import { MSG_AGAINST_KEY } from "../type";

export default (data) => async (dispatch) => {
  dispatch({
    type: MSG_AGAINST_KEY,
    payload: data,
  });
};

// export default allMessagesAction
