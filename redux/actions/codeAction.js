import * as type from '../types'

export const getCode = (code, email) => dispathch => {
    dispathch({
        type: type.GET_CODE,
        payload: {
            code,
            email
        }
    })
}

export const reset = () => dispatch => {
    dispatch({
        type: type.RESET_CODE_MAIL
    })
}


export const getCodeAgain = (code) => dispatch => {
    dispatch({
        type: type.GET_CODE_AGAIN,
        payload: {
            code
        }
    })
}