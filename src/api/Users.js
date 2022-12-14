import axios from "axios";
import variables from "./variables";

const Users = {
  signUp: async (data) => {
    let res = await axios.post(`${variables.API_URL}SignUp`, data);
    // console.log(`res on signup -->`, res);
    return res;
  },
  loginIn: async (data) => {
    let res = await axios.post(`${variables.API_URL}Login`, data);
    // console.log(`res on signup -->`, res);
    return res;
  },
  getAllUsers: async (data) => {
    let res = await axios.post(`${variables.API_URL}AllUsers`, data);
    return res;
  },
  createGroup: async (data) => {
    let res = await axios.post(`${variables.API_URL}CreateGroup`, data);
    return res;
  },
  allGroups: async (data) => {
    let res = await axios.post(`${variables.API_URL}AllGroups`, data);
    return res;
  },
  deleteGroup: async (data) => {
    let res = await axios.post(`${variables.API_URL}DeleteGroup`, data);
    return res;
  },
};
export default Users;
