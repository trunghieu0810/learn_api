import * as type from '../types'

const initalState = {
    search: '',
}

const searchReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.SET_SEARCH:
            return {
                ...state,
                search: action.search
            }
        default:
            return state
    }
}

export default searchReducer