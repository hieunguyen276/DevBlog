import callApi from "../callApi";
import {
  getList, getListSuccess, getListFail,
  getAllRole, getAllRoleSuccess, getAllRoleFail,
  createCategory, createCategorySuccess, createCategoryFail,
  updateCategory, updateCategorySuccess, updateCategoryFail,
  deleteCategory, deleteCategorySuccess, deleteCategoryFail,
} from "../../states/modules/category";
import { getDetailCategory, getDetailCategoryFail, getDetailCategorySuccess, removeBlogFail, removeBlogSuccess, startRemoveBlog } from "../../states/modules/categoryDetail";

export const getListCategory = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {
  let path = `categories?per_page=${dataFilter.perPage}&page=${dataFilter.page}`;

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

export const getAllRoleForCategory = () => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `categories`,
    actionTypes: [getAllRole, getAllRoleSuccess, getAllRoleFail],
    variables: {},
    dispatch,
    getState
  })
}


export const getACategory = (idCategory) => async (dispatch, getState) => {
  return callApi({
    method: 'get',
    apiPath: `categories/${idCategory}`,
    actionTypes: [getDetailCategory,
      getDetailCategorySuccess,
      getDetailCategoryFail,],
    variables: {},
    dispatch,
    getState
  })
}

export const handleCreateCategory = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `categories`,
    actionTypes: [createCategory, createCategorySuccess, createCategoryFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateCategory = (data, idCategory) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `categories/${idCategory}`,
    actionTypes: [updateCategory, updateCategorySuccess, updateCategoryFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateCategoryBlog = (idCategory, idBlog) => async (dispatch, getState) => {
  return callApi({
    method: 'put',
    apiPath: `categories/${idCategory}/${idBlog}`,
    actionTypes: [startRemoveBlog, removeBlogSuccess, removeBlogFail],
    variables: {},
    dispatch,
    getState
  })
}

export const handleDeleteCategory = (idCategory) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `categories/${idCategory}`,
    actionTypes: [deleteCategory, deleteCategorySuccess, deleteCategoryFail],
    variables: {},
    dispatch,
    getState
  })
}
