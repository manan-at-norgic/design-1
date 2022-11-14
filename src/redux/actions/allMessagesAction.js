import { ALL_MSGS } from "../type";

export default (data) => async (dispatch) => {
  dispatch({
    type: ALL_MSGS,
    payload: data,
  });
};

// export default allMessagesAction
