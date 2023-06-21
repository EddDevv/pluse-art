import {OPEN_MESSAGE_SMS} from './actions'
const initialState = {
    openMessage: false,


}

export const messageReducer = (state = initialState, action) => {

    switch (action.type) {
        case OPEN_MESSAGE_SMS: {
            return {
                ...state,
                openMessage: !state.openMessage
            }

        }

        default:
            return state
    }
}