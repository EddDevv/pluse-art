import { USER_INFO,USER_INFO_CODE  } from './actions'
const initialState = {
    value:{
        phoneNumber:'',

    },
    code:''


}

export const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO: {
            return {
                ...state,
                value:action.payload
            }
        }
        case USER_INFO_CODE: {
            return {
                ...state,
                code:action.payload
            }
        }

        default:
            return state
    }
}