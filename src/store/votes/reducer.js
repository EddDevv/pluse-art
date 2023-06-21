import {VOTES} from './actions'
const initialState = {
    value:{
        items:[{
            id:0,
            question:'',
            answers:[]
        }]
    }

}

export const votesReducer = (state = initialState, action) => {
    switch (action.type) {
        case VOTES: {
            return {
                ...state,
                value:action.payload
            }
        }

        default:
            return state
    }
}