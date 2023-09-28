import * as type from '../types'

const initalState = {
    infoUser: {},
    isLogin: false,
    isLoading: false,
}

const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.USER_UPDATE_INFO_USER:
            return {
                ...state,
                infoUser: action.infoUser
            }
        case type.USER_LOGIN_FAIL:
            return {
                infoUser: {},
                isLogin: false,
                isLoading: true, 
            }
        case type.USER_LOGIN_SUCCESS:
            return {
                ...state,
                infoUser: action.infoUser,
                isLogin: true,
                isLoading: true,
            }
        case type.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLogin: false,
                infoUser: {},
            }
        default:
            return state
    }
}

export default userReducer