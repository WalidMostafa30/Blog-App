import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.post("/api/auth/register", formData);
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

export const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const { data } = await axios.post("/api/auth/login", formData);

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
