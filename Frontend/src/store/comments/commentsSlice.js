import { createSlice } from "@reduxjs/toolkit";
import {
  actCreateNewComment,
  actDeleteComment,
  actGetAllComments,
  actGetCommentsCount,
  actUpdateComment,
} from "./commentsActions";

const initialState = {
  comments: [],
  commentsCount: 0,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    cleanComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // get all comments
      .addCase(actGetAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actGetAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(actGetAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get comments count
      .addCase(actGetCommentsCount.fulfilled, (state, action) => {
        state.commentsCount = action.payload;
      })

      // create new comment
      .addCase(actCreateNewComment.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actCreateNewComment.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.comments.push(action.payload);
      })
      .addCase(actCreateNewComment.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // update comment
      .addCase(actUpdateComment.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actUpdateComment.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.comments = state.comments.map((comment) => {
          if (comment._id === action.payload._id) return action.payload;
          return comment;
        });
      })
      .addCase(actUpdateComment.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // delete comment
      .addCase(actDeleteComment.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actDeleteComment.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
      })
      .addCase(actDeleteComment.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { cleanComments } = commentsSlice.actions;
export default commentsSlice.reducer;
