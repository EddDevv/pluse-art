import { FUND_BALANCE } from "./actions"

const initialState = {
    fund: ""
}

export const dopInfoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FUND_BALANCE: {
            return {
                ...state,
                fund: action.payload
            }
        }
        default:
            return state
    }
}