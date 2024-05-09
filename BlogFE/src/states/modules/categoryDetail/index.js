import { createSlice } from "@reduxjs/toolkit";

const categoryDetailSlice = createSlice({
  name: 'categoryDetails',
  initialState: {
    categoryDetails: {},
    isLoading: false,
    paginationListBlog: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    visibleModalRemoveBlogFromCategory: false,
    isLoadingBtnDeleteBlog: false,
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

    setVisibleModalRemoveBlogFromCategory: (state, action) => ({
      ...state,
      visibleModalRemoveBlogFromCategory: action.payload
    }),
    startRemoveBlog: (state) => ({
      ...state,
      isLoadingBtnDeleteBlog: true
    }),
    removeBlogSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteBlog: false
    }),
    removeBlogFail: (state) => ({
      ...state,
      isLoadingBtnDeleteBlog: false
    }),

  }
})

export const {
  getDetailCategory,
  getDetailCategorySuccess,
  getDetailCategoryFail,
  startRemoveBlog, removeBlogFail, removeBlogSuccess, setVisibleModalRemoveBlogFromCategory
} = categoryDetailSlice.actions

export default categoryDetailSlice.reducer;
