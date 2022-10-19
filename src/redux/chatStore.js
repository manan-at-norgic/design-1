import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chatStore",
  initialState: { value: [{ a: "hi i am from chat store", b: "ok" }] },
  reducers: {
    addChat: (state, action) => {
      //write code
      state.value.push(action.payload);
    },
  },
});

export const { addChat } = chatSlice.actions;
export default chatSlice.reducer;
