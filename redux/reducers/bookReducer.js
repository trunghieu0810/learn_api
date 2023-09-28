import * as type from '../types'

const initalState = {
    books: [],
    currentBook: {},
    tags: [],
    currentEditBook: {},
    currentDisplayBooksInAllBook: [],
}

const bookReducer = (state = initalState, action) => {
    switch (action.type) {
        case type.GET_ALL_BOOKS:
            return {
                ...state,
                books: action.books
            }
        case type.GET_BOOK_BY_SLUG:
            return {
                ...state,
                currentBook: action.book
            }
        case type.SET_ALL_TAGS:
            return {
                ...state,
                tags: action.tags
            }
        case type.SET_CURRENT_EDIT_BOOK:
            return {
                ...state,
                currentEditBook: action.book
            }
        case type.SET_DISPLAY_BOOKS_IN_ALL_BOOK:
            return {
                ...state,
                currentDisplayBooksInAllBook: action.books
            }
        default:
            return state
    }
}

export default bookReducer