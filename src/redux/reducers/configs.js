import { CONFIG } from "../type";

const initialState = [];

const userConfig = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG:
      return (state = [...action.payload]);
    default:
      return state;
  }
};

export default userConfig;
