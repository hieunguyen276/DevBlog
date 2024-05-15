import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isShowSideBar: true,
    isThemeLight: false,
    title: 'Dashboard',
    location: {
      pathName: '',
      payload: {},
      prevPathName: ''
    },
    goToPage: {
      path: '',
      redirected: false
    }
  },
  reducers: {
    startRequest: (state) => ({
      ...state,
      list: null
    }),
    requestSuccess: (state, action) => ({
      ...state,
      list: action.payload
    }),
    requestError: (state) => ({
      ...state,
      list: 'sdsd'
    }),
    handleSetIsShowSideBar: (state, action) => ({
      ...state,
      isShowSideBar: action.payload
    }),
    setTitlePage: (state, action) => ({
      ...state,
      title: action.payload
    }),
    setLocation: (state, action) => ({
      ...state,
      location: {
        pathName: action.payload.pathName,
        payload: action.payload.payload || {},
        prevPathName: action.payload.prevPathName || null,
      }
    }),

    goToPage: (state, action) => ({
      ...state,
      goToPage: {
        path: action.payload.path,
        redirected: false
      }
    }),
    goToPageSuccess: (state) => ({
      ...state,
      goToPage: {
        ...state.goToPage,
        redirected: true
      }
    }),
  }
})

export const {
  handleSetIsShowSideBar,
  setTitlePage,
  setLocation,
  startRequest, requestSuccess, requestError,
  goToPage, goToPageSuccess
} = appSlice.actions

export default appSlice.reducer;
