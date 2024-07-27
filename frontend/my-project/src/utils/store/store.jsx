import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import activateSlice from "../slices/activateSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    activate: activateSlice
  }
});

export default store;
