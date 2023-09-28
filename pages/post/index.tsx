
import React from 'react'
import Layout from '../../component/Layout'
import Head from 'next/head'
import { getPost } from '../../lib/post'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

const Post = ({ posts }) => {
    return (
        <Layout>
            <Head>
                <meta charSet="UTF-8"></meta>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>Post</title>
            </Head>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {posts.map(post => (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {post.id} -- {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {post.body}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link href={`/post/${post.id}`}>
                                <Button size="small">Learn More</Button>
                            </Link>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const posts = await getPost();
    return {
        props: {
            posts
        }
    }
}

export default Post