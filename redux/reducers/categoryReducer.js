import * as type from '../types'

const initalState = {
    categories: []
}

const categoryReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.SET_CATEGORY: {
            state.categories = action.categories;
        }
        default:
            return state
    }
}

export default categoryReducer