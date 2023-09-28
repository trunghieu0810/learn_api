import path from "path"
import Layout from "../../component/Layout"
import { getPostById, getPostId } from "../../lib/post"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";
import LinearProgress from '@mui/material/LinearProgress';

const PostDetail = ({ post }) => {

    const router = useRouter()
    //Nếu trang chưa tạo ra, isFallback của router === true
    //va trang tạm thời sau đấy sẽ đc render
    if (router.isFallback) {
        return (
            <div>
                <LinearProgress color="success" />
            </div>
        )
    }

    // Khi getStaticProps() chạy xong lần đầu tiên
    // Cac lần sau thì trang số 6 (vd) sẽ đưa vòa danh sách prerendered
    return (
        <Layout>
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {post.id} -- {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.body}
                    </Typography>
                </CardContent>
            </Card>
        </Layout>
    )
}

//Lấy dữ liệu kiểu tỉnh, nhưng dữ liệu thuộc vào paths params
export async function getStaticPaths() {
    const paths = await getPostId()
    return {
        paths,
        // fallback: false, // bất kỳ path nào không returned bởi getStaticPath    sẽ tới trang 404
        fallback: true // path không returned ngay lập tức sẽ show trang 'tạm thời' => đợi getStaticProps chạy 
        //=> getStaticProps chạy xong rồi trả về trang hoàn chỉnh
    }
}

export const getStaticProps = async ({ params }) => {
    const post = await getPostById(params.id);
    return {
        props: {
            post
        },
        revalidate: 1,// kiểm tra ở databse dữ liệu có thay đổi hay không để tự render lại
    }
}

export default PostDetail