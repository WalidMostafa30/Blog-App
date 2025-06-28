import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actGetAllUsers = createAsyncThunk(
  "users/actGetAllUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { data } = await axios.get(`/api/users/profile`, {
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

export const actGetUsersCount = createAsyncThunk(
  "users/actGetUsersCount",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { data } = await axios.get(`/api/users/count`, {
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
