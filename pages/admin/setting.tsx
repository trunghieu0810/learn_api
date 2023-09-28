import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import Head from 'next/head';
import { Container, Grid, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
const NavigationMobile = dynamic(() => import('../../component/Admin/NavigationMobile'))
const Navigation = dynamic(() => import('../../component/Admin/Navigation'))
// const Layout = dynamic(() => import('../../component/Layout'),
//     {
//         loading: () => <LinearProgress></LinearProgress>
//     }
// )
import Layout from '../../component/Layout'

function product(props) {
    const isLogin = useSelector((state: RootStateOrAny) => state.userReducer.isLogin)
    const infoUser = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const router = useRouter()
    const status = useSelector((state: RootStateOrAny) => state.userReducer)

    if (!status.isLoading) return (<LinearProgress></LinearProgress>)

    if (!status.isLogin) router.push('/login')

    if (infoUser.role == 'user') router.push('/')

    return (
        <Layout active="admin">
            <Head>
                <title>Cài đặt</title>
            </Head>
            <Container className='relative' maxWidth='lg'>
                <NavigationMobile option='setting'></NavigationMobile>
                <Grid className='mb-16' container spacing={3}>
                    <Grid className='mt-16 min:hidden 900px:block' item md={3}>
                        <Navigation option='setting'></Navigation>
                    </Grid>
                    <Grid className='mt-16' sm={12} item md={9}>
                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg '>
                            Setting
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default product;