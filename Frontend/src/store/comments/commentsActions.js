import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actGetAllComments = createAsyncThunk(
  "comments/actGetAllComments",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { data } = await axios.get(`/api/comments`, {
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

export const actGetCommentsCount = createAsyncThunk(
  "comments/actGetCommentsCount",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { data } = await axios.get(`/api/comments/count`, {
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

export const actCreateNewComment = createAsyncThunk(
  "comments/actCreateNewComment",
  async (formData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { data } = await axios.post(`/api/comments`, formData, {
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

export const actUpdateComment = createAsyncThunk(
  "comments/actUpdateComment",
  async (formData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { commentId, text } = formData;
    try {
      const { data } = await axios.put(
        `/api/comments/${commentId}`,
        { text },
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

export const actDeleteComment = createAsyncThunk(
  "comments/actDeleteComment",
  async (commentId, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      await axios.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });

      return commentId;
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
