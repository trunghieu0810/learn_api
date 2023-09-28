import axios from "axios";

export const getPost = async () => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const getPostId = async () => {
    try {
        const posts = await getPost();
        return posts.map(post => {
            return {
                params: {
                    id: `${post.id}`,
                }
            }
        })
    
    } catch (e) {
        console.log(e)
    }
}

export const getPostById = async (id) => {
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return res.data
    } catch (e) {
        console.log(e)
    }
}