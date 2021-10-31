import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState: {
    currentUser: null,
    isFetching: false,
    isUser: false,
    token : "",
    error: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching =true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
      state.token= state.currentUser.token
      state.isUser = true
      if (state.currentUser.status === "bad") {
        state.error = true
        state.currentUser = null
        state.isUser = false
      } else {
        state.error = false
      }
    },
    loginFailure: (state) => {
      state.isFetching = false
      state.error = true
      state.token = ""
      state.isUser = false
    },
    logoutUser: (state) => {
      state.currentUser = null
      state.token = ""
      state.isUser = false
    },
// DELETE ACTION
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.user.currrentUser=null
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPDATE ACTION
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} = userSlice.actions;

export default userSlice.reducer;