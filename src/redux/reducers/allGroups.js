import { GET_GROUPS } from "../type";

const initialState = [];

const getAllGroups = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS:
      state = { groups: action.payload };
      return state;
    default:
      return state;
  }
};

export default getAllGroups;
