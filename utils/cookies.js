import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const setAccessToken = (token) => {
    const current = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(current.getFullYear() + 1);
    cookies.set("_jwt", token, { path: '/', expires: nextYear })
}

export const getAccessToken = () => {
    return cookies.get("_jwt")
}