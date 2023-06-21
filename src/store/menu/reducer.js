import { OPEN_MENU } from './actions'
const initialState = {
    showMenuBurg: false

}

export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MENU: {
            return {
                ...state,
                showMenuBurg: !state.showMenuBurg
            }
        }
        default:
            return state
    }
}