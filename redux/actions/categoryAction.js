import * as type from '../types'
export const getCategory = (data) => dispatch => {
    dispatch({
        type: type.SET_CATEGORY,
        categories: data,
    })
}
