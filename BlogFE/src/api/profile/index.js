import callApi from "../callApi";
import {
  changeAvatar,
  changeAvatarFail,
  changeAvatarSuccess,
  changePassword, changePasswordFail, changePasswordSuccess,
  updateInfoUser, updateInfoUserFail, updateInfoUserSuccess
} from "../../states/modules/profile";

export const handleUpdateInfoUser = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `auth/me`,
    actionTypes: [updateInfoUser, updateInfoUserSuccess, updateInfoUserFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleChangePassword = (data) => async (dispatch, getState) => {
  // console.log(data)
  return callApi({
    method: 'patch',
    apiPath: `auth/change-password`,
    actionTypes: [changePassword, changePasswordSuccess, changePasswordFail],
    variables: data,
    dispatch,
    getState
  })
}


export const handleChangeAvatar = (data) => async (dispatch, getState) => {
  // console.log(data)
  return callApi({
    method: 'patch',
    apiPath: `auth/change-avatar`,
    actionTypes: [changeAvatar, changeAvatarSuccess, changeAvatarFail],
    variables: data,
    dispatch,
    getState
  })
}
