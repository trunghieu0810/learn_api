import axios from "axios";

export const getRandom = async () => {
    try {
        const res = await axios.get('https://api.chucknorris.io/jokes/random');
        return res.data
    } catch (e) {
        console.log(e)
    }
}