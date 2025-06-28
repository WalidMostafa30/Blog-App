import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actGetAllPosts = createAsyncThunk(
  "posts/actGetAllPosts",
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { pageNumber, category } = formData;

    try {
      if (category) {
        const { data } = await axios.get(`/api/posts?category=${category}`);
        return data;
      } else if (pageNumber) {
        const { data } = await axios.get(`/api/posts?pageNumber=${pageNumber}`);
        return data;
      }
      const { data } = await axios.get(`/api/posts`);
      return data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const actGetPostsCount = createAsyncThunk(
  "posts/actGetPostsCount",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { data } = await axios.get(`/api/posts/count`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      return data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const actGetSinglePost = createAsyncThunk(
  "posts/actGetSinglePost",
  async (postId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get(`/api/posts/${postId}`);
      return data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const actCreateNewPost = createAsyncThunk(
  "posts/actCreateNewPost",
  async (formData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { data } = await axios.post(`/api/posts`, formData, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const actUpdatePost = createAsyncThunk(
  "posts/actUpdatePost",
  async ({ postId, formData }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { data } = await axios.put(`/api/posts/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      return data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const actUpdatePostPhoto = createAsyncThunk(
  "posts/actUpdatePostPhoto",
  async ({ postId, formData }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    try {
      const { data } = await axios.put(
        `/api/posts/upload-image/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const actLikePost = createAsyncThunk(
  "posts/actLikePost",
  async (postId, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { data } = await axios.put(
        `/api/posts/likes/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const actDeletePost = createAsyncThunk(
  "posts/actDeletePost",
  async (postId, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      await axios.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      return postId;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
