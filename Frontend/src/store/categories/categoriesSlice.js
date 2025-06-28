import { createSlice } from "@reduxjs/toolkit";
import {
  actCreateNewCategory,
  actDeleteCategory,
  actGetCategories,
  actGetCategoriesCount,
} from "./categoriesActions";

const initialState = {
  categories: [],
  categoriesCount: 0,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanCategories: (state) => {
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // get categories
      .addCase(actGetCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actGetCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(actGetCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create new category
      .addCase(actCreateNewCategory.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actCreateNewCategory.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.categories.push(action.payload);
      })
      .addCase(actCreateNewCategory.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // delete category
      .addCase(actDeleteCategory.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(actDeleteCategory.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(actDeleteCategory.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // get categories count
      .addCase(actGetCategoriesCount.fulfilled, (state, action) => {
        state.categoriesCount = action.payload;
      });
  },
});

export const { cleanCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
