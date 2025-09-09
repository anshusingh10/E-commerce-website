import { put, takeEvery } from "redux-saga/effects"
import { CREATE_SETTINGS, CREATE_SETTINGS_RED, DELETE_SETTINGS, DELETE_SETTINGS_RED, GET_SETTINGS, GET_SETTINGS_RED, UPDATE_SETTINGS, UPDATE_SETTINGS_RED } from "../Constants"
// import { createMultipartRecord,  deleteRecord, getRecord, updateMultipartRecord, } from "./Services/index"
import { createRecord, deleteRecord, getRecord, updateRecord } from "./Services/index"


function* createSaga(action) {                                        //worker saga
    let response = yield createRecord("settings", action.payload)
    yield put({ type: CREATE_SETTINGS_RED, payload: response })

    // let response = yield createMultipartRecord("settings", action.payload)
    // yield put({ type: CREATE_SETTINGS_RED, payload: response })
}

function* getSaga() {                                        //worker saga
    let response = yield getRecord("settings")
    yield put({ type: GET_SETTINGS_RED, payload: response })
}
function* updateSaga(action) {                                        //worker saga
    yield updateRecord("settings", action.payload)
    yield put({ type: UPDATE_SETTINGS_RED, payload: action.payload })

    // let response= updateMultipartRecord("settings", action.payload)
    // yield put({ type: UPDATE_SETTINGS_RED, payload: response })
}
function* deleteSaga(action) {                                        //worker saga
    yield deleteRecord("settings", action.payload)
    yield put({ type: DELETE_SETTINGS_RED, payload: action.payload })
}
export default function* settingSaga() {
    yield takeEvery(CREATE_SETTINGS, createSaga)
    yield takeEvery(GET_SETTINGS, getSaga)
    yield takeEvery(UPDATE_SETTINGS, updateSaga)
    yield takeEvery(DELETE_SETTINGS, deleteSaga)           //watcher saga
}
