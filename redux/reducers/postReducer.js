import * as type from '../types'

const initalState = {
    posts: [],
    post: {},
    loading: false,
    error: null,
}

const postReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.GET_POST:
            console.log('hello');
            return {
                ...state,
                posts: action.payload,
                loading: false,
                error: null,
            }
        default:
            return state
    }
}

export default postReducer