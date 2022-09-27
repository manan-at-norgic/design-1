import userDataApi from "./userDataApi";
const userMessages = {
  sender: [
    {
      name: userDataApi[0].name,
      time: `6:09am`,
      msg: "hi there",
    },
    {
      name: userDataApi[0].name,
      time: `6:09am`,
      msg: "what's going on...",
    },
    {
      name: userDataApi[0].name,
      time: `6:09am`,
      msg: "where are you?",
    },
    {
      name: userDataApi[0].name,
      time: `6:09am`,
      msg: "are you okay",
    },
  ],
  reciver: [
    {
      name: userDataApi[1].name,
      time: `6:09am`,
      msg: "hi...",
    },
    {
      name: userDataApi[1].name,
      time: `6:09am`,
      msg: "Nothing special..",
    },
    {
      name: userDataApi[1].name,
      time: `6:09am`,
      msg: "I am at Home",
    },
    {
      name: userDataApi[1].name,
      time: `6:09am`,
      msg: "yeah",
    },
  ],
};

export default userMessages;
