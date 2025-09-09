import { put, takeEvery } from "redux-saga/effects"
import { CREATE_FAQ, CREATE_FAQ_RED, DELETE_FAQ, DELETE_FAQ_RED, GET_FAQ, GET_FAQ_RED, UPDATE_FAQ, UPDATE_FAQ_RED } from "../Constants"
// import { createMultipartRecord,  deleteRecord, getRecord, updateMultipartRecord, } from "./Services/index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"


function* createSaga(action) {                                        //worker saga
    let response = yield createRecord("faq", action.payload)
    yield put({ type: CREATE_FAQ_RED, payload: response })

    // let response = yield createMultipartRecord("faq", action.payload)
    // yield put({ type: CREATE_FAQ_RED, payload: response })
}

function* getSaga() {                                        //worker saga
    let response = yield getRecord("faq")
    yield put({ type: GET_FAQ_RED, payload: response })
}
function* updateSaga(action) {                                        //worker saga
    yield updateRecord("faq", action.payload)
    yield put({ type: UPDATE_FAQ_RED, payload: action.payload })

    // let response= updateMultipartRecord("faq", action.payload)
    // yield put({ type: UPDATE_FAQ_RED, payload: response })
}
function* deleteSaga(action) {                                        //worker saga
    yield deleteRecord("faq", action.payload)
    yield put({ type: DELETE_FAQ_RED, payload: action.payload })
}
export default function* faqSaga() {
    yield takeEvery(CREATE_FAQ, createSaga)
    yield takeEvery(GET_FAQ, getSaga)
    yield takeEvery(UPDATE_FAQ, updateSaga)
    yield takeEvery(DELETE_FAQ, deleteSaga)           //watcher saga
}
