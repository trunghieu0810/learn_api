import { useDispatch, useSelector, RootStateOrAny } from "react-redux"
import { useEffect } from "react"
import { getPost } from '../../redux/actions/postAction'

const TestRedux = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state: RootStateOrAny) => state.postReducer)
    useEffect(() => {
        dispatch(getPost());
    }, [])

    return (
        <div className="test">
            h1
            {posts.posts}
        </div>
    )
}

export default TestRedux