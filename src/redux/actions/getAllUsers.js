import { GET_ALL_USERS } from "../type";
import Users from "../../api/Users";

const setAllUsers = (data) => ({
  type: GET_ALL_USERS,
  payload: data,
});

export const allUsers = () => {
  return async (dispatch) => {
    let token = localStorage.getItem("auth_token");
    let res = await Users.getAllUsers({ auth_token: token });
    console.log(res.data);
    console.log(token);
    dispatch(setAllUsers(res.data.users));
  };
};
