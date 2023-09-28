import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';


const Layout = dynamic(() =>
    import('../component/Layout'),
    {
        loading: () => <LinearProgress></LinearProgress>
    }
)

function NotFound(props) {
    const router = useRouter()
    useEffect(() => {
        console.log(router)
        setTimeout(() => {
            router.push('/')
        }, 1000)
    }, [])

    return (
        <Layout>
            Không tìm thấy gì
            <Link href={'/'} passHref>
                <a>Go back home</a>
            </Link>
        </Layout>
    );
}

export default NotFound;