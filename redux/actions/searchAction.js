import * as type from '../types'

export const setSearch = (search) => async dispathch => {
    dispathch({
        type: type.SET_SEARCH,
        search
    })
}
