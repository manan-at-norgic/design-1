import { combineReducers } from "redux";
import getAllGroups from "./allGroups";
import signIn from "./signIn";

export default combineReducers({ signIn: signIn, groups: getAllGroups });
