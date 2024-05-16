import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    errorInfoUser: {
      name: '',
      email: '',
      phone: '',
    },
    loadingBtnUpdateInfoUser: false,
    errorChangePassword: {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    loadingBtnChangePassword: false,
    visibleModalUpdateAvatar: false,
    isLoadingBtnUpdateAvatar: false,
    errorCreateOrUpdateAvatar: {
      avatar: '',
    },
  },
  reducers: {
    setErrorInfoUser: (state, action) => ({
      ...state,
      errorInfoUser: action.payload
    }),
    setErrorInformation: (state, action) => ({
      ...state,
      errorInformation: action.payload
    }),
    setErrorChangePassword: (state, action) => ({
      ...state,
      errorChangePassword: action.payload
    }),
    updateInfoUser: (state) => ({
      ...state,
      loadingBtnUpdateInfoUser: true
    }),
    updateInfoUserSuccess: (state) => ({
      ...state,
      loadingBtnUpdateInfoUser: false
    }),
    updateInfoUserFail: (state) => ({
      ...state,
      loadingBtnUpdateInfoUser: false
    }),
    changePassword: (state) => ({
      ...state,
      loadingBtnChangePassword: true
    }),
    setDataChangePassword: (state, action) => ({
      ...state,
      dataChangePassword: action.payload
    }),
    changePasswordSuccess: (state) => ({
      ...state,
      loadingBtnChangePassword: false
    }),
    changePasswordFail: (state) => ({
      ...state,
      loadingBtnChangePassword: false
    }),

    changeAvatar: (state) => ({
      ...state,
      loadingBtnChangeAvatar: true
    }),
    setDataChangeAvatar: (state, action) => ({
      ...state,
      dataChangeAvatar: action.payload
    }),
    changeAvatarSuccess: (state) => ({
      ...state,
      loadingBtnChangeAvatar: false
    }),
    changeAvatarFail: (state) => ({
      ...state,
      loadingBtnChangeAvatar: false
    }),
    setErrorUpdateAvatar: (state, action) => ({
      ...state,
      errorCreateOrUpdateCategory: action.payload
    }),
    setVisibleModalUpdateAvatar: (state, action) => ({
      ...state,
      visibleModalUpdateAvatar: action.payload
    }),
  }
})

export const {
  setErrorInfoUser,
  setErrorChangePassword,
  setDataChangePassword,setErrorInformation,
  updateInfoUser, updateInfoUserSuccess, updateInfoUserFail,
  changePassword, changePasswordSuccess, changePasswordFail,
  setErrorUpdateAvatar, setVisibleModalUpdateAvatar,
  changeAvatarFail, changeAvatarSuccess, setDataChangeAvatar, changeAvatar
} = profileSlice.actions

export default profileSlice.reducer;
