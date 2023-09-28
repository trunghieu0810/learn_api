import * as type from '../types'
import { setAccessToken } from '../../utils/cookies'
export const userLogin = (data) => dispatch => {
    setAccessToken(data.token)
    dispatch({
        type: type.USER_LOGIN_SUCCESS,
        infoUser: data.data
    })
}
export const userLoginFail = () => dispatch => {
    dispatch({
        type: type.USER_LOGIN_FAIL
    })
}

export const updateInfoUser = (infoUser) => dispatch => {
    dispatch({
        type: type.USER_UPDATE_INFO_USER,
        infoUser: infoUser
    })
}

export const userLogout = () => dispatch => {
    dispatch({
        type: type.USER_LOGOUT_SUCCESS
    })
}
