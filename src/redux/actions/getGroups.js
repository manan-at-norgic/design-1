import Users from "../../api/Users";
import { GET_GROUPS } from "../type";

const setGroups = (data) => ({
  type: GET_GROUPS,
  payload: data,
});

export default () => {
  return async (dispatch) => {
    let token = localStorage.getItem("auth_token");
    const allGroupsRes = await Users.allGroups({ auth_token: token });
    console.log(`res-> `, allGroupsRes);
    let data = allGroupsRes.data.groups;
    // console.log("i am data", data);
    dispatch(setGroups(data));
  };
};
