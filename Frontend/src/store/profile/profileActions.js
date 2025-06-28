import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actGetProfile = createAsyncThunk(
  "profile/actGetProfile",
  async (userId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get(`/api/users/profile/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const actUpdateProfilePhoto = createAsyncThunk(
  "profile/actUpdateProfilePhoto",
  async (formData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState();

    try {
      const { data } = await axios.post(
        `/api/users/profile/profile-photo-upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${state.auth.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const actUpdateProfile = createAsyncThunk(
  "profile/actUpdateProfile",
  async (formData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    try {
      const { data } = await axios.put(
        `/api/users/profile/${getState().auth.user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const actDeleteProfile = createAsyncThunk(
  "profile/actDeleteProfile",
  async (userId, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    try {
      await axios.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      return userId;
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
