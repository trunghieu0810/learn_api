import * as type from '../types'

export const loadingCart = (cart) => dispathch => {
    dispathch({
        type: type.GET_CART_USER,
        cart,
    })
}

export const loagoutCart = () => dispathch => {
    dispathch({
        type: type.LOGOUT_CART,
    })
}

export const minusItem = (id) => dispatch => {
    dispatch({
        type: type.MINUS_ITEM,
        id
    })
}

export const plusItem = (id) => dispatch => {
    dispatch({
        type: type.PLUS_ITEM,
        id
    })
}

export const deleteItem = (id) => dispatch => {
    dispatch({
        type: type.DELETE_ITEM,
        id
    })
}

export const resetCart = () => dispatch => {
    dispatch({
        type: type.RESET_CART
    })
}


