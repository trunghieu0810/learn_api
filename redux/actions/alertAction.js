import * as type from '../types'

export const showAlertSuccess = (message) => dispathch => {
    dispathch({
        type: type.SHOW_ALERT_SUCCESS,
        payload: {
            message
        }
    })
}

export const showAlertError = (message) => dispathch => {
    dispathch({
        type: type.SHOW_ALERT_ERROR,
        payload: {
            message
        }
    })
}

export const hideAlert = () => dispathch => {
    dispathch({
        type: type.HIDE_ALERT
    })
}