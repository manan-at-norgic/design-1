import { ALL_MSGS, CURRENT_GROUP, MESSAGE__ } from "../type";

const initialState = {
  messages: [],
  currentGroup: "",
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_GROUP:
      return (state = { ...state, currentGroup: action.payload });

    case MESSAGE__:
      return (state = { ...state, messages: action.payload });
    default:
      return state;
  }
};

export default messageReducer;
