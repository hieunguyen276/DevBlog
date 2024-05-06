import { createSlice } from "@reduxjs/toolkit";

const authorSlice = createSlice({
  name: 'authors',
  initialState: {
    authors: [],
    isLoadingTableAuthor: false,
    paginationListAuthor: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    allRole: [],
    visibleModalCreateOrUpdateAuthor: false,
    isLoadingBtnCreateOrUpdateAuthor: false,
    errorCreateOrUpdateAuthor: {
      name: '',
      email: '',
      bio: '',
      birthday: '',
      avatar: '',
      status: '',
      certificateName: '',
      certificateTime: '',
    },
    visibleModalDeleteAuthor: false,
    isLoadingBtnDeleteAuthor: false,
  },
  reducers: {
    setErrorCreateOrUpdateAuthor: (state, action) => ({
      ...state,
      errorCreateOrUpdateAuthor: action.payload
    }),
    setVisibleModalCreateOrUpdateAuthor: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateAuthor: action.payload
    }),
    setVisibleModalDeleteAuthor: (state, action) => ({
      ...state,
      visibleModalDeleteAuthor: action.payload
    }),
    getList: (state) => ({
      ...state,
      authors: [],
      isLoadingTableAuthor: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableAuthor: false,
      authors: action.payload.data.authors,
      paginationListAuthor: {
        currentPage: action.payload.data.current_page,
        perPage: action.payload.data.per_page,
        totalPage: action.payload.data.last_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      authors: [],
      isLoadingTableAuthor: false
    }),
    getAllRole: (state) => ({...state}),
    getAllRoleSuccess: (state, action) => ({
      ...state,
      allRole: action.payload.data,
    }),
    getAllRoleFail: (state) => ({...state}),
    createAuthor: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: true
    }),
    createAuthorSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: false
    }),
    createAuthorFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: false
    }),
    updateAuthor: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: true
    }),
    updateAuthorSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: false
    }),
    updateAuthorFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateAuthor: false
    }),
    deleteAuthor: (state) => ({
      ...state,
      isLoadingBtnDeleteAuthor: true
    }),
    deleteAuthorSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteAuthor: false
    }),
    deleteAuthorFail: (state) => ({
      ...state,
      isLoadingBtnDeleteAuthor: false
    }),
  }
})

export const {
  setErrorCreateOrUpdateAuthor,
  setVisibleModalDeleteAuthor,
  setVisibleModalCreateOrUpdateAuthor,
  getList, getListSuccess, getListFail,
  getAllRole, getAllRoleSuccess, getAllRoleFail,
  createAuthor, createAuthorSuccess, createAuthorFail,
  updateAuthor, updateAuthorSuccess, updateAuthorFail,
  deleteAuthor, deleteAuthorSuccess, deleteAuthorFail,
} = authorSlice.actions

export default authorSlice.reducer;
