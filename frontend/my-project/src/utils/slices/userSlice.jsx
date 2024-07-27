import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    user: null,
    activated: false,
    otp: {
      phone: "",
      hash: "",
    },
  },
  reducers: {
    setAuth: (state, action) => {
      console.log(action.payload, "action payload");
      const { user } = action.payload.data;

      // Ensure user is defined before accessing properties
      if (user) {
        state.user = user;
        state.activated = user.activated ?? false;
        state.isAuth = true;
      } else {
        state.user = null;
        state.activated = false;
        state.isAuth = false;
      }
    },
    sendOtps: (state, action) => {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

export const { setAuth, sendOtps } = userSlice.actions;
export default userSlice.reducer;
