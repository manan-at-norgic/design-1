import { ALL_MSGS, CURRENT_GROUP, MESSAGE__, MSG_AGAINST_KEY } from "../type";

const initialState = {
  messages: [],
  currentGroup: "",
  allMsgs: [],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_GROUP:
      return (state = { ...state, currentGroup: action.payload });

    case MESSAGE__:
      return (state = { ...state, messages: action.payload });
    case ALL_MSGS:
      return (state = {
        ...state,
        allMsgs: [...state.allMsgs, action.payload],
      });
    case MSG_AGAINST_KEY:
      let cElem;
      state.allMsgs.forEach((elem) => {
        // console.error("element here", elem);
        const haskey = elem.hasOwnProperty(action.payload.groupName);
        // console.warn(`key exist ${haskey}`);
        if (haskey) {
          // console.log(haskey, "has key from reducer", elem);
          return (cElem = elem);
        }
      });
      cElem[action.payload.groupName] = action.payload.addMessages;
      // console.warn("cElem here", cElem, "payload =>", action.payload.groupName);
      return state;
    // return (state = {
    //   ...state,
    //   allMsgs: [...state.allMsgs, action.payload],
    // });
    default:
      return state;
  }
};

export default messageReducer;
