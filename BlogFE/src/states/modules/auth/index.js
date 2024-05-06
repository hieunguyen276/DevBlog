import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthSuccess: false,
    authUser:{},
    errorRegister: {
      name : '',
      email : '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
      avatar:'',
    },
    isLoadingBtnLogin: false,
    isLoadingBtnRegister: false
  },
  reducers: {
    startRequestLogin: (state) => ({
      ...state,
      isLoadingBtnLogin: true
    }),
    startRequestLoginSuccess: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startRequestLoginFail: (state) => ({
      ...state,
      isLoadingBtnLogin: false
    }),
    startRequestGetMe: (state) => ({
      ...state,
    }),
    startRequestGetMeSuccess: (state, action) => ({
      ...state,
      isAuthSuccess: true,
      authUser: action.payload.data
    }),
    startRequestGetMeFail: (state) => ({
      ...state,
      isAuthSuccess: false,
      authUser: {}
    }),
    startRequestRegister: (state) => ({
      ...state,
      isLoadingBtnRegister: true
    }),
    startRequestRegisterSuccess: (state) => ({
      ...state,
      isLoadingBtnRegister: false
    }),
    startRequestRegisterFail: (state) => ({
      ...state,
      isLoadingBtnRegister: false
    }),
  }
})

export const {
  startRequestLogin, startRequestLoginSuccess, startRequestLoginFail,
  startRequestGetMe, startRequestGetMeSuccess, startRequestGetMeFail,
  startRequestRegister, startRequestRegisterSuccess, startRequestRegisterFail
} = authSlice.actions

export default authSlice.reducer;
