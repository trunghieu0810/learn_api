import * as type from '../types'

const initalState = {
    cart: [],
    isLoading: false,
}

const cartReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.RESET_CART:
            return {
                ...state,
                cart: []
            }
        case type.MINUS_ITEM:
            return {
                ...state,
                cart: state.cart.map(value => {
                    if (value.product._id === action.id) {
                        value.quantity--
                    }
                    return value
                })
            }
        case type.PLUS_ITEM:
            return {
                ...state,
                cart: state.cart.map(value => {
                    if (value.product._id === action.id) {
                        value.quantity++
                    }
                    return value
                })
            }
        case type.DELETE_ITEM:
            return {
                ...state,
                cart: state.cart.filter(value => (value.product._id !== action.id))
            }
        case type.GET_CART_USER:
            return {
                ...state,
                cart: action.cart,
                isLoading: true,
            }
        case type.LOGOUT_CART:
            return {
                ...state,
                cart: [],
                isLoading: false,
            }
        default:
            return state
    }
}

export default cartReducer