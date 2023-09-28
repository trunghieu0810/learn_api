import React, { useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/router';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';

// const Layout = dynamic(() =>
//     import('../../component/Layout'),
//     {
//         loading: () => <LinearProgress></LinearProgress>
//     }
// )
import Layout from '../../component/Layout'

function NotFound(props) {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push('/admin/dashboard')
        }, 1000)
    }, [])

    return (
        <Layout>
        </Layout>
    );
}

export default NotFound;