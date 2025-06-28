import { createSlice } from "@reduxjs/toolkit";
import {
  actGetProfile,
  actUpdateProfilePhoto,
  actDeleteProfile,
  actUpdateProfile,
} from "./profileActions";

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    cleanProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get profile
      .addCase(actGetProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actGetProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(actGetProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // upload profile photo
      .addCase(actUpdateProfilePhoto.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actUpdateProfilePhoto.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.profile.profilePhoto = action.payload;
      })
      .addCase(actUpdateProfilePhoto.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // update profile
      .addCase(actUpdateProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actUpdateProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.profile = action.payload;
      })
      .addCase(actUpdateProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // delete post
      .addCase(actDeleteProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actDeleteProfile.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(actDeleteProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export default profileSlice.reducer;

export const { cleanProfile } = profileSlice.actions;
