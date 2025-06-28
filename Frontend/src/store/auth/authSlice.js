import { createSlice } from "@reduxjs/toolkit";
import { actAuthLogin, actAuthRegister } from "./authActions";
import {
  actUpdateProfile,
  actUpdateProfilePhoto,
} from "../profile/profileActions";

const user = localStorage.getItem("blogUserLS")
  ? JSON.parse(localStorage.getItem("blogUserLS"))
  : null;

const userInLocalStorage = (data) => {
  localStorage.setItem("blogUserLS", JSON.stringify(data));
};

const initialState = {
  user,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      userInLocalStorage(state.user);
    },
  },
  extraReducers: (builder) => {
    //register
    builder
      .addCase(actAuthRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actAuthRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(actAuthRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(actAuthLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actAuthLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        userInLocalStorage(state.user);
      })
      .addCase(actAuthLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // upload profile photo
      .addCase(actUpdateProfilePhoto.fulfilled, (state, action) => {
        state.user.profilePhoto = action.payload.url;
        userInLocalStorage(state.user);
      })
      // update profile
      .addCase(actUpdateProfile.fulfilled, (state, action) => {
        state.user.username = action.payload.username;
        userInLocalStorage(state.user);
      });
  },
});

export const { authLogout } = authSlice.actions;
export default authSlice.reducer;
