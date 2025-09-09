
import { CREATE_SETTINGS, GET_SETTINGS, UPDATE_SETTINGS, DELETE_SETTINGS } from "../Constants"



export function createSettings(data) {
  return {
    type: CREATE_SETTINGS,
    payload: data
  }
}

export function getSettings() {
  return {
    type: GET_SETTINGS,

  }
}
export function updateSettings(data) {
  return {
    type: UPDATE_SETTINGS,
    payload: data
  }
}
export function deleteSettings(data) {
  return {
    type: DELETE_SETTINGS,
    payload: data
  }
}
