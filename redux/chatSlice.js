import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  room: "123",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const { setUsername, setRoom } = chatSlice.actions;

export default chatSlice.reducer;
