import {
  all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  getAllRoleForAuthor,
  getListAuthor
} from "../../../api/author";
import {
  setErrorCreateOrUpdateAuthor,
  setVisibleModalCreateOrUpdateAuthor,
  setVisibleModalDeleteAuthor,
  createAuthorFail, createAuthorSuccess,
  updateAuthorFail, updateAuthorSuccess,
  deleteAuthorFail, deleteAuthorSuccess,
} from "./index";
import {getNotification} from "../../../utils/helper";
import _ from "lodash";
import { Avatar } from "antd";

function* loadRouteData () {
  yield put(setTitlePage('Author Management'));
  yield put(getListAuthor());
  yield put(getAllRoleForAuthor());
}

function* handleActions () {
  yield takeLatest(createAuthorSuccess, function* () {
    getNotification('success', 'Create author success');
    yield put(setVisibleModalCreateOrUpdateAuthor(false));
    yield put(getListAuthor());
  });

  yield takeLatest(createAuthorFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorCreateOrUpdateAuthor({
        name: _.get(errors, 'name', ''),
        email: _.get(errors, 'email', ''),
        bio: _.get(errors, 'bio', ''),
        avatar: _.get(errors, 'avatar', ''),
        birthday: _.get(errors, 'birthday', ''),
      }));
    }
    getNotification('error', 'Create author fail');
  });

  yield takeLatest(updateAuthorSuccess, function* () {
    getNotification('success', 'Update author success');
    yield put(setVisibleModalCreateOrUpdateAuthor(false));
    yield put(getListAuthor());
  });

  yield takeLatest(updateAuthorFail, function* (action) {
    let status = action.payload.status;
    if (status === 400) {
      let errors = action.payload.data.errors;
      yield put(setErrorCreateOrUpdateAuthor({
        name: _.get(errors, 'name', ''),
        email: _.get(errors, 'email', ''),
        bio: _.get(errors, 'bio', ''),
        birthday: _.get(errors, 'birthday', ''),
        avatar: _.get(errors, 'avatar', ''),
      }));
    }
    getNotification('error', 'Update author fail');
  });


  yield takeLatest(deleteAuthorSuccess, function* () {
    getNotification('success', 'Delete author success');
    yield put(setVisibleModalDeleteAuthor(false));
    yield put(getListAuthor());
  });

  yield takeLatest(deleteAuthorFail, function* () {
    yield call(getNotification, 'error', 'Failed to delete author.');
  });

}

export default function* loadAuthorSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
