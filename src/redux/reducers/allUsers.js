import { GET_ALL_USERS } from "../type";

const initialState = [];

const allUsers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return (state = [...action.payload]);
    default:
      return state;
  }
};

export default allUsers;
