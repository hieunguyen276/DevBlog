import callApi from "../callApi";
import {
  getList, getListSuccess, getListFail,
  getAllRole, getAllRoleSuccess, getAllRoleFail,
  createBlog, createBlogSuccess, createBlogFail,
  updateBlog, updateBlogSuccess, updateBlogFail,
  deleteBlog, deleteBlogSuccess, deleteBlogFail,
} from "../../states/modules/blog";

export const getListBlog = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
  let path = `blogs?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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

export const getAllRoleForBlog = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `blogs`,
    actionTypes: [getAllRole, getAllRoleSuccess, getAllRoleFail],
    variables: {},
    dispatch,
    getState
  })
}

export const handleCreateBlog = (data) => async (dispatch, getState) => {

  return callApi({
    method: 'post',
    apiPath: `blogs`,
    actionTypes: [createBlog, createBlogSuccess, createBlogFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateBlog = (data, idBlog) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `blogs/${idBlog}`,
    actionTypes: [updateBlog, updateBlogSuccess, updateBlogFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleDeleteBlog = (idBlog) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `blogs/${idBlog}`,
    actionTypes: [deleteBlog, deleteBlogSuccess, deleteBlogFail],
    variables: {},
    dispatch,
    getState
  })
}
