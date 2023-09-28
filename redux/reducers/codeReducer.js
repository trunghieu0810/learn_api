import * as type from '../types'

const initalState = {
    code: '',
    email: '',
    loading: false,
    error: null,
}

const postReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.GET_CODE:
            return {
                ...state,
                code: action.payload.code,
                email: action.payload.email,
                loading: true,
                error: null,
            }
        case type.RESET_CODE_MAIL:
            return {
                ...state,
                code: '',
                email: '',
                loading: false,
            }
        case type.GET_CODE_AGAIN:
            return {
                ...state,
                code: action.payload.code,
                loading: true,
                error: null,
            }
        default:
            return state
    }
}

export default postReducer