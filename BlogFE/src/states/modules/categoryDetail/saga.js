import {
  all, call, fork, put,
  takeLatest
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import _ from "lodash";
import { getNotification } from "../../../utils/helper";
import { removeBlogFail, removeBlogSuccess, setVisibleModalRemoveBlogFromCategory } from "./index";

function* loadRouteData () {
  yield put(setTitlePage('Category Detail'));
}

function* handleActions () {
  yield takeLatest(removeBlogSuccess, function* () {
    getNotification('success', 'Remove blog success');
    yield put(setVisibleModalRemoveBlogFromCategory(false));
  });

  yield takeLatest(removeBlogFail, function* () {
    yield call(getNotification, 'error', 'Failed to remove blog.');
  });
}


export default function* loadCategoryDetailSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
