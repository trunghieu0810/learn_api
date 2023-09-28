import Layout from "../../component/Layout"
import {getRandom} from '../../lib/joker'
const Random = ({joke, abc}) => {
    return (
        <Layout>
            <div>{joke.id}</div>
            <div>{joke.updated_at}</div>
            <div>{joke.value}</div>
            <div>abc: {abc}</div>

        </Layout>
    )
}
//Du lieu  phụ thuộc vào mỗi req, nhưng mà vẫn tạo ra frontend , nên vẫn tốt cho SEO
export const getServerSideProps = async () => {
    let joke = await getRandom();
    //joke = false

    //if (!joke) 
    // return {
    //     notFound: true ///API bị hỏng sẽ trả về trang 404
    // }
    // return {
    //     redirect: {
    //         destination: '/', // API bị hỏng sẽ đi tới trang '/'
    //         permanent: false
    //     }
    // }

    return {
        props: {
            joke,
            abc: "Đây là abc nè"
        }
    }
}

export default Random