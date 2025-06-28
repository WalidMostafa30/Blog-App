import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get(`/api/categories`);
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

export const actGetCategoriesCount = createAsyncThunk(
  "categories/actGetCategoriesCount",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await axios.get(`/api/categories/count`);
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

export const actCreateNewCategory = createAsyncThunk(
  "categories/actCreateNewCategory",
  async (payload, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.post(`/api/categories`, payload, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
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

export const actDeleteCategory = createAsyncThunk(
  "categories/actDeleteCategory",
  async (id, thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI;
    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      });
      return id;
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
