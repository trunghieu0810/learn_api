import * as type from '../types'

export const loadingBook = (books) => dispatch => {
    dispatch({
        type: type.GET_ALL_BOOKS,
        books: books,
    })
}

export const loadingCurrentBook = (book) => dispatch => {
    dispatch({
        type: type.GET_BOOK_BY_SLUG,
        book: book,
    })
}

export const loadingAllTags = (tags) => dispatch => {
    dispatch({
        type: type.SET_ALL_TAGS,
        tags: tags,
    })
}

export const loadingCurrentEditBook = (book) => dispatch => {
    dispatch({
        type: type.SET_CURRENT_EDIT_BOOK,
        book: book,
    })
}

export const loadingDisplayInAllBook = (books) => dispatch => {
    dispatch({
        type: type.SET_DISPLAY_BOOKS_IN_ALL_BOOK,
        books: books,
    })
}