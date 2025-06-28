import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import usersSlice from "./users/usersSlice";
import profileSlice from "./profile/profileSlice";
import postsSlice from "./posts/postsSlice";
import categoriesSlice from "./categories/categoriesSlice";
import commentsSlice from "./comments/commentsSlice";
import modalsSlice from "./modals/modalsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    profile: profileSlice,
    posts: postsSlice,
    categories: categoriesSlice,
    comments: commentsSlice,
    modals: modalsSlice,
  },
});
