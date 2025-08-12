import { configureStore } from '@reduxjs/toolkit'
import chatReducer from "./../redux/chatSlice"
export const store = configureStore({
  reducer: {
    chat:chatReducer
  },
})