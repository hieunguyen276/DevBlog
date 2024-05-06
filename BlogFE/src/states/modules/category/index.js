import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: 'categorys',
  initialState: {
    categorys: [],
    isLoadingTableCategory: false,
    paginationListCategory: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    allRole: [],
    visibleModalCreateOrUpdateCategory: false,
    isLoadingBtnCreateOrUpdateCategory: false,
    errorCreateOrUpdateCategory: {
      name: '',
      description: ''
    },
    errorShowAndUpdateCategory: {
      name: '',
      description: ''
    },
    visibleModalDeleteCategory: false,
    isLoadingBtnDeleteCategory: false,
  },
  reducers: {
    setErrorCreateOrUpdateCategory: (state, action) => ({
      ...state,
      errorCreateOrUpdateCategory: action.payload
    }),
    setErrorShowAndUpdateCategory: (state, action) => ({
      ...state,
      errorShowAndUpdateCategory: action.payload
    }),
    setVisibleModalCreateOrUpdateCategory: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateCategory: action.payload
    }),
    setVisibleModalShowAndUpdateCategory: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateCategory: action.payload
    }),
    setVisibleModalDeleteCategory: (state, action) => ({
      ...state,
      visibleModalDeleteCategory: action.payload
    }),
    getList: (state) => ({
      ...state,
      categorys: [],
      isLoadingTableCategory: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableCategory: false,
      categorys: action.payload.data.categorys,
      paginationListCategory: {
        currentPage: action.payload.data.current_page,
        perPage: action.payload.data.per_page,
        totalPage: action.payload.data.last_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      categorys: [],
      isLoadingTableCategory: false
    }),
    getAllRole: (state) => ({...state}),
    getAllRoleSuccess: (state, action) => ({
      ...state,
      allRole: action.payload.data,
    }),
    getAllRoleFail: (state) => ({...state}),
    createCategory: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: true
    }),
    createCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false
    }),
    createCategoryFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false
    }),
    updateCategory: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: true
    }),
    updateCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false
    }),
    updateCategoryFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateCategory: false
    }),
    deleteCategory: (state) => ({
      ...state,
      isLoadingBtnDeleteCategory: true
    }),
    deleteCategorySuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteCategory: false
    }),
    deleteCategoryFail: (state) => ({
      ...state,
      isLoadingBtnDeleteCategory: false
    }),
  }
})

export const {
  setErrorCreateOrUpdateCategory,
  setErrorShowAndUpdateCategory,
  setVisibleModalDeleteCategory,
  setVisibleModalCreateOrUpdateCategory,
  setVisibleModalShowAndUpdateCategory,
  getList, getListSuccess, getListFail,
  getAllRole, getAllRoleSuccess, getAllRoleFail,
  createCategory, createCategorySuccess, createCategoryFail,
  updateCategory, updateCategorySuccess, updateCategoryFail,
  deleteCategory, deleteCategorySuccess, deleteCategoryFail,
} = categorySlice.actions

export default categorySlice.reducer;
