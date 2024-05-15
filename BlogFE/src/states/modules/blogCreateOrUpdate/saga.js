import {
  all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {goToPage, setTitlePage} from "../app";
import {
  getAllRoleForBlog,
  getListBlog
} from "../../../api/blog";
import {
  setErrorCreateOrUpdateBlog,
  setVisibleModalCreateOrUpdateBlog,
  setVisibleModalDeleteBlog,
  createBlogFail, createBlogSuccess,
  updateBlogFail, updateBlogSuccess,
  deleteBlogFail, deleteBlogSuccess,
} from "./index";
import {getNotification} from "../../../utils/helper";
import _ from "lodash";


function* loadRouteData () {
  yield put(setTitlePage('Blog Management Create Or Update'));
  yield put(getListBlog());
  yield put(getAllRoleForBlog());
}

function* handleActions () {
  yield takeLatest(createBlogSuccess, function* () {
    getNotification('success', 'Create blog success');
    yield put(setVisibleModalCreateOrUpdateBlog(false));
    yield put(getListBlog());
    yield put(goToPage({
      path: "/blogs"
    }))
    
  });

  yield takeLatest(createBlogFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorCreateOrUpdateBlog({
        title: _.get(errors, 'title', ''),
        content: _.get(errors, 'content', ''),
        thumbnail: _.get(errors, 'thumbnail', ''),
        author_id: _.get(errors, 'author_id', ''),
        categories: _.get(errors, 'categories', ''),
      }));
    }
    getNotification('error', 'Create blog fail');
  });

  yield takeLatest(updateBlogSuccess, function* () {
    getNotification('success', 'Update blog success');
    yield put(setVisibleModalCreateOrUpdateBlog(false));
    yield put(getListBlog());
    yield put(goToPage({
      path: "/blogs"
    }))
  });

  yield takeLatest(updateBlogFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorCreateOrUpdateBlog({
        title: _.get(errors, 'title', ''),
        content: _.get(errors, 'content', ''),
        thumbnail: _.get(errors, 'thumbnail', ''),
        author_id: _.get(errors, 'author_id', ''),
        categories: _.get(errors, 'categories', ''),
      }));
    }
    getNotification('error', 'Update blog fail');
  });


  yield takeLatest(deleteBlogSuccess, function* () {
    getNotification('success', 'Delete blog success');
    yield put(setVisibleModalDeleteBlog(false));
    yield put(getListBlog());
  });

  yield takeLatest(deleteBlogFail, function* () {
    yield call(getNotification, 'error', 'Failed to delete blog.');
  });

}

export default function* loadBlogSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
