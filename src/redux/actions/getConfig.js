import axios from "axios";
import { CONFIG } from "../type";

//types

//actions

const setConfig = (data) => ({
  type: CONFIG,
  payload: data,
});

// const setLoading = (data) => ({
//   type: IS_LOADING,
//   payload: data,
// });

//action creators

export const getDomaiName = () => {
  return async (dispatch) => {
    let res = await axios.get("config.json");
    // console.log(res.data.name);
    let name = res.data.name;
    let domainName = [];
    for (let i = 0; i < name.length; i++) {
      domainName.push(name[i]);
    }

    // let data = await res.json();
    // console.log(domainName, "domain nameeeeeeeeeee");
    dispatch(setConfig(domainName));
  };
};
