import { CREATE_SETTINGS_RED, DELETE_SETTINGS_RED, GET_SETTINGS_RED, UPDATE_SETTINGS_RED } from "../Constants"

export default function SettingsReducer(state = [], action) {

    switch (action.type) {
        case CREATE_SETTINGS_RED:
            return [...state, action.payload]

        case GET_SETTINGS_RED:
            // Add your GET_SETTINGS_RED logic here if needed, or just return state
            return state;

        case UPDATE_SETTINGS_RED: {
            let index = state.findIndex(x => x.id === action.payload.id)

            state[index].map = action.payload.map
            state[index].phone = action.payload.phone
            state[index].whatsapp = action.payload.whatsapp
            state[index].email = action.payload.email
            state[index].siteName = action.payload.siteName
            state[index].facebook = action.payload.facebook
            state[index].twitter = action.payload.twitter
            state[index].instagram = action.payload.instagram
            state[index].linkedin = action.payload.linkedin
            state[index].youtube = action.payload.youtube

            return state
        }

        case DELETE_SETTINGS_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state
    }

}
