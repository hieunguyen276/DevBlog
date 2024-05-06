import callApi from "../callApi";
import {
  getList, getListSuccess, getListFail,
  getAllRole, getAllRoleSuccess, getAllRoleFail,
  createAuthor, createAuthorSuccess, createAuthorFail,
  updateAuthor, updateAuthorSuccess, updateAuthorFail,
  deleteAuthor, deleteAuthorSuccess, deleteAuthorFail,
} from "../../states/modules/author";

export const getListAuthor = (dataFilter = {
  perPage: 10,
  page: 1

}) => async (dispatch, getState) => {
  let path = `authors?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&q=${dataFilter.keySearch}`;
  }

  // if (dataFilter.status && dataFilter.status.length > 0) {
  //   path += `&status=${dataFilter.status}`;
  // }

  if (dataFilter.order && dataFilter.column) {
    path += `&sort_order=${dataFilter.order}&field=${dataFilter.column}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getList, getListSuccess, getListFail],
    variables: {},
    dispatch,
    getState
  })
}

export const getAllRoleForAuthor = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `authors`,
    actionTypes: [getAllRole, getAllRoleSuccess, getAllRoleFail],
    variables: {},
    dispatch,
    getState
  })
}

export const handleCreateAuthor = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `authors`,
    actionTypes: [createAuthor, createAuthorSuccess, createAuthorFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateAuthor = (data, idAuthor) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `authors/${idAuthor}`,
    actionTypes: [updateAuthor, updateAuthorSuccess, updateAuthorFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleDeleteAuthor = (idAuthor) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `authors/${idAuthor}`,
    actionTypes: [deleteAuthor, deleteAuthorSuccess, deleteAuthorFail],
    variables: {},
    dispatch,
    getState
  })
}
