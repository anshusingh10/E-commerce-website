import { put, takeEvery } from "redux-saga/effects"
import { CREATE_USER, CREATE_USER_RED, DELETE_USER, DELETE_USER_RED, GET_USER, GET_USER_RED, UPDATE_USER, UPDATE_USER_RED } from "../Constants"
// import { createMultipartRecord,  deleteRecord, getRecord, updateMultipartRecord, } from "./Services/index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"


function* createSaga(action) {                                        //worker saga
    let response = yield createRecord("user", action.payload)
    yield put({ type: CREATE_USER_RED, payload: response })

    // let response = yield createMultipartRecord("user", action.payload)
    // yield put({ type: CREATE_USER_RED, payload: response })
}

function* getSaga() {                                        //worker saga
    let response = yield getRecord("user")
    yield put({ type: GET_USER_RED, payload: response })
}
function* updateSaga(action) {                                        //worker saga
    yield updateRecord("user", action.payload)
    yield put({ type: UPDATE_USER_RED, payload: action.payload })

    // let response= updateMultipartRecord("user", action.payload)
    // yield put({ type: UPDATE_USER_RED, payload: response })
}
function* deleteSaga(action) {                                        //worker saga
    yield deleteRecord("user", action.payload)
    yield put({ type: DELETE_USER_RED, payload: action.payload })
}
export default function* userSaga() {
    yield takeEvery(CREATE_USER, createSaga)
    yield takeEvery(GET_USER, getSaga)
    yield takeEvery(UPDATE_USER, updateSaga)
    yield takeEvery(DELETE_USER, deleteSaga)           //watcher saga
}
