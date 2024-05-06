import {
  all, fork, put

} from "redux-saga/effects";
import {setTitlePage} from "../app";
import { getListEmployee } from "../../../api/employee";
import { getListCategory } from "../../../api/category";
import { getListBlog } from "../../../api/blog";
import { getListAuthor } from "../../../api/author";

function* loadRouteData () {
  yield put(setTitlePage('Dashboard')) 
  yield put(getListBlog());
  yield put(getListAuthor());
   yield put(getListCategory());
   yield put(getListEmployee());
}

function* handleActions () {
  //;
}

export default function* loadHomeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
