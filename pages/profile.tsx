import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Container, Grid, Divider } from '@mui/material';
import { BsReverseLayoutTextWindowReverse, BsBook, BsBookmarkStar } from 'react-icons/bs'
import style from '../styles/Profile.module.css'
import { useRouter } from 'next/router';
import { useSelector, RootStateOrAny } from 'react-redux';
import axios from 'axios';


const Layout = dynamic(() => import('../component/Layout'),
    {
        loading: () => <LinearProgress></LinearProgress>
    }
)

const OrderList = dynamic(() => import('../component/Profile/OrderList'))
const ReviewList = dynamic(() => import('../component/Profile/ReviewList'))
const PurchasedList = dynamic(() => import('../component/Profile/PurchasedList'))
const ProfileDetail = dynamic(() => import('../component/Profile/ProfileDetail'))


function Profile(props) {
    const [option, setOption] = useState('Danh sách đơn hàng')
    const router = useRouter()
    const status = useSelector((state: RootStateOrAny) => state.userReducer)
    
    useEffect(() => {
        setOption('Danh sách đơn hàng')
    }, [])


    if (!status.isLoading) return (<LinearProgress></LinearProgress>)
    
    if (!status.isLogin) router.push('/login')

    const handleClickOption = (e) => {
        e.preventDefault()
        setOption(e.target.innerText)
    }

    const render = () => {
        switch (option) {
            case 'Danh sách đơn hàng':
                return (<OrderList></OrderList>)
            case 'Danh sách đã mua':
                return (<PurchasedList></PurchasedList>)
            case 'Danh sách review':
                return (<ReviewList></ReviewList>)
            default:
                return (<OrderList></OrderList>)
        }
    }

    return (
        <Layout>
            <Head>
                <title>Profile</title>
            </Head>
            <Container maxWidth='lg'>
                <Grid className='mb-16' container spacing={3}>
                    <Grid className=' mt-16' item md={12}>
                        <ProfileDetail></ProfileDetail>
                    </Grid>
                    <Grid className=' mt-16' item md={4}>
                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg '>
                            <div className='text-xl font-bold mb-2'>Thông tin</div>
                            <Divider></Divider>
                            <button onClick={handleClickOption} className={option == 'Danh sách đơn hàng' ? 'hover:opacity-80 cursor-pointer font-sans items-center mt-4 relative ' + style.active : 'hover:opacity-80 cursor-pointer font-sans items-center mt-4'} style={{ display: 'flex' }}>
                                <BsReverseLayoutTextWindowReverse className='mr-2 text-xl'></BsReverseLayoutTextWindowReverse>
                                <span>Danh sách đơn hàng</span>
                            </button>
                            <button onClick={handleClickOption} className={option == 'Danh sách đã mua' ? 'hover:opacity-80 cursor-pointer font-sans  items-center mt-3 relative ' + style.active : 'hover:opacity-80 cursor-pointer font-sans  items-center mt-3'} style={{ display: 'flex' }}>
                                <BsBook className='mr-2 text-xl'></BsBook>
                                <span>Danh sách đã mua</span>
                            </button>
                            <button onClick={handleClickOption} className={option == 'Danh sách review' ? 'hover:opacity-80 cursor-pointer font-sans items-center mt-3 relative ' + style.active : 'hover:opacity-80 cursor-pointer font-sans items-center mt-3'} style={{ display: 'flex' }}>
                                <BsBookmarkStar className='mr-2 text-xl'></BsBookmarkStar>
                                <span>Danh sách review</span>
                            </button>
                        </div>
                    </Grid>
                    <Grid className='mt-16' item md={8}>
                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg '>
                            {render()}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default Profile;