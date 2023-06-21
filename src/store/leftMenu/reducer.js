import { OPEN_LEFTMENU } from './actions'
const initialState = {
    leftMenu: false

}

export const leftMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_LEFTMENU: {
            return {
                ...state,
                leftMenu: !state.leftMenu
            }
        }
        default:
            return state
    }
}