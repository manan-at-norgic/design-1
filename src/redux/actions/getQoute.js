import axios from "axios";
import { GET_QOUTES } from "../type";

const setQoutes = (data) => ({
  type: GET_QOUTES,
  payload: data,
});

export const getquotes = () => {
  return async (dispatch) => {
    let res = await axios.get("https://type.fit/api/quotes");
    Array.prototype.random = function random() {
      return this[Math.floor(Math.random() * this.length)];
    };
    dispatch(setQoutes(res.data.random()));
  };
};
