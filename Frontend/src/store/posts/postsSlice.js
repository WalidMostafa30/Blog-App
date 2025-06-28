import { createSlice } from "@reduxjs/toolkit";
import {
  actCreateNewPost,
  actDeletePost,
  actGetAllPosts,
  actGetPostsCount,
  actGetSinglePost,
  actLikePost,
  actUpdatePost,
  actUpdatePostPhoto,
} from "./postsActions";
import {
  actCreateNewComment,
  actDeleteComment,
  actUpdateComment,
} from "../comments/commentsActions";

const initialState = {
  posts: [],
  post: {},
  postsCount: 0,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanPosts: (state) => {
      state.posts = [];
      state.post = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // get all posts
      .addCase(actGetAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actGetAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(actGetAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get posts count
      .addCase(actGetPostsCount.fulfilled, (state, action) => {
        state.postsCount = action.payload;
      })

      // get single post
      .addCase(actGetSinglePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actGetSinglePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(actGetSinglePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------------------------------------------------------------------
      // add new comment
      .addCase(actCreateNewComment.fulfilled, (state, action) => {
        state.post.comments.push(action.payload);
      })
      // update comment
      .addCase(actUpdateComment.fulfilled, (state, action) => {
        state.post.comments = state.post.comments.map((comment) => {
          if (comment._id === action.payload._id) {
            return action.payload;
          }
          return comment;
        });
      })
      // delete comment
      .addCase(actDeleteComment.fulfilled, (state, action) => {
        if (state.post.comments) {
          state.post.comments = state.post.comments.filter(
            (comment) => comment._id !== action.payload
          );
        }
      })
      // -------------------------------------------------------------------

      // create post
      .addCase(actCreateNewPost.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actCreateNewPost.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(actCreateNewPost.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // update post photo
      .addCase(actUpdatePostPhoto.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actUpdatePostPhoto.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.post.image = action.payload.image;
      })
      .addCase(actUpdatePostPhoto.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // update post
      .addCase(actUpdatePost.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actUpdatePost.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.post = action.payload;
      })
      .addCase(actUpdatePost.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // toggle like
      .addCase(actLikePost.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actLikePost.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.post.likes = action.payload.likes;
      })
      .addCase(actLikePost.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // delete post
      .addCase(actDeletePost.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actDeletePost.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(actDeletePost.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { cleanPosts } = postsSlice.actions;
export default postsSlice.reducer;
