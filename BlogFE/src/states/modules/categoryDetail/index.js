import { createSlice } from "@reduxjs/toolkit";

const categoryDetailSlice = createSlice({
  name: 'categoryDetails',
  initialState: {
    categoryDetails: {},
    isLoading: false
  },
  reducers: {
    getDetailCategory: (state) => ({
      ...state,
      isLoading: true
    }),
    getDetailCategorySuccess: (state, action) => ({
      ...state,
      isLoading: false,
      categoryDetails: action.payload.data,
    }),
    getDetailCategoryFail: (state) => ({
      ...state,
      categoryDetails: {},
    }),

  }
})

export const {
  getDetailCategory,
  getDetailCategorySuccess,
  getDetailCategoryFail,
} = categoryDetailSlice.actions

export default categoryDetailSlice.reducer;
