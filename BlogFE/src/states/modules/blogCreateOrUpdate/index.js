import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    isLoadingTableBlog: false,
    paginationListBlog: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    allRole: [],
    visibleModalCreateOrUpdateBlog: false,
    isLoadingBtnCreateOrUpdateBlog: false,
    errorCreateOrUpdateBlog: {
      title: '',
      content: '',
      thumbnail: '',
      author_id: '',
      categories: '',
    },
    visibleModalDeleteBlog: false,
    isLoadingBtnDeleteBlog: false,
    category: []
  },
  reducers: {
    setErrorCreateOrUpdateBlog: (state, action) => ({
      ...state,
      errorCreateOrUpdateBlog: action.payload
    }),
    setVisibleModalCreateOrUpdateBlog: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateBlog: action.payload
    }),
    setVisibleModalDeleteBlog: (state, action) => ({
      ...state,
      visibleModalDeleteBlog: action.payload
    }),
    getList: (state) => ({
      ...state,
      blogs: [],
      isLoadingTableBlog: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableBlog: false,
      blogs: action.payload.data.blogs,
      paginationListBlog: {
        currentPage: action.payload.data.current_page,
        perPage: action.payload.data.per_page,
        totalPage: action.payload.data.last_page,
        totalRecord: action.payload.data.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      blogs: [],
      isLoadingTableBlog: false
    }),
    getAllRole: (state) => ({...state}),
    getAllRoleSuccess: (state, action) => ({
      ...state,
      allRole: action.payload.data,
    }),
    getAllRoleFail: (state) => ({...state}),
    createBlog: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBlog: true
    }),
    createBlogSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBlog: false
    }),
    createBlogFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBlog: false
    }),
    updateBlog: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBlog: true
    }),
    updateBlogSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBlog: false
    }),
    updateBlogFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBlog: false
    }),
    deleteBlog: (state) => ({
      ...state,
      isLoadingBtnDeleteBlog: true
    }),
    deleteBlogSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteBlog: false
    }),
    deleteBlogFail: (state) => ({
      ...state,
      isLoadingBtnDeleteBlog: false
    }),

    setDataCategorySelect: (state, action) => ({
      ...state,
      category: action.payload,
    }),
  }
})

export const {
  setErrorCreateOrUpdateBlog,
  setVisibleModalDeleteBlog,
  setVisibleModalCreateOrUpdateBlog,
  getList, getListSuccess, getListFail,
  getAllRole, getAllRoleSuccess, getAllRoleFail,
  createBlog, createBlogSuccess, createBlogFail,
  updateBlog, updateBlogSuccess, updateBlogFail,
  deleteBlog, deleteBlogSuccess, deleteBlogFail,
  setDataCategorySelect
} = blogSlice.actions

export default blogSlice.reducer;
