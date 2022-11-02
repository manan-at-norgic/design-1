import { combineReducers } from "redux";
import getAllGroups from "./allGroups";
import signIn from "./signIn";
import config from "./configs";
import allUsers from "./allUsers";

export default combineReducers({
  signIn: signIn,
  groups: getAllGroups,
  domainName: config,
  allUsers: allUsers,
});
