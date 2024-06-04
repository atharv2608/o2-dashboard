import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  designation: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload.userData);
      state.designation = action.payload.designation;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.designation = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
