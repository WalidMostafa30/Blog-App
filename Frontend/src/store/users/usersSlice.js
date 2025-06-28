import { createSlice } from "@reduxjs/toolkit";
import { actGetAllUsers, actGetUsersCount } from "./usersActions";
import { actDeleteProfile } from "../profile/profileActions";

const initialState = {
  users: [],
  usersCount: 0,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    cleanUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //get all users
      .addCase(actGetAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actGetAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(actGetAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // users count
      .addCase(actGetUsersCount.fulfilled, (state, action) => {
        state.usersCount = action.payload;
      })

      // delete user
      .addCase(actDeleteProfile.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export const { cleanUsers } = usersSlice.actions;
export default usersSlice.reducer;
