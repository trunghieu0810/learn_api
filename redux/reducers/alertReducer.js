import * as type from '../types'

const initalState = {
    type: '',
    message: '',
    isShow: false,
}

const alertReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.SHOW_ALERT_ERROR:
            return {
                ...state,
                type: 'error',
                message: action.payload.message,
                isShow: true,
            }
        case type.SHOW_ALERT_SUCCESS:
            return {
                ...state,
                type: 'success',
                message: action.payload.message,
                isShow: true,
            }
        case type.HIDE_ALERT:
            return {
                ...state,
                isShow: false,
            }
        default:
            return state
    }
}

export default alertReducer