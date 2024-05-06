import {
  all, fork, put
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import _ from "lodash";

function* loadRouteData () {
  yield put(setTitlePage('Category Management'));
}

function* handleActions () {

}

export default function* loadCategorySaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
