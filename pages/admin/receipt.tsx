import React, { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import Head from 'next/head';
import style from '../../styles/Profile.module.css'
import { ButtonGroup, Button, CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Container, Grid, Divider } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import Layout from '../../component/Layout'
import axios from 'axios';
import * as URL from '../../services/api/config'
import RemoveAccents from '../../helper/RemoveAccents'

const NavigationMobile = dynamic(() => import('../../component/Admin/NavigationMobile'))
const Navigation = dynamic(() => import('../../component/Admin/Navigation'))
const CardOrderList = dynamic(() => import('../../component/Admin/Receipt/CardOrderList'))

function receipt(props) {
    const infoUser = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const status = useSelector((state: RootStateOrAny) => state.userReducer)
    const router = useRouter()
    const [receipts, setReceipts] = useState([])
    const [currentReceipts, setCurrentReceipts] = useState([])
    const [active, setActive] = useState('');
    const [currentSelect, setCurrentSelect] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setActive('All')
    }, [])

    useMemo(() => {
        if (active === 'All') {
            setCurrentReceipts(receipts)
        } else {
            let a = receipts.filter(value => value.deliveryStatus == active)
            setCurrentReceipts(a)
        }
    }, [active])


    useEffect(() => {
        const fetApi = async () => {
            await axios.get(URL.URL_GET_ALL_RECEIPT)
                .then(res => {
                    setReceipts(res.data.receipts)
                    setCurrentReceipts(res.data.receipts)
                    setIsLoading(true)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        if (status.isLogin && infoUser.role == 'admin') {
            fetApi()
        }
    }, [status.isLogin])

    if (!status.isLoading) return (<LinearProgress></LinearProgress>)

    if (!status.isLogin) router.push('/login')

    if (infoUser.role == 'user') router.push('/')

    const handleClickActive = (e) => {
        setActive(e.target.name)
    }

    const handleChangeStatus = (id, status) => {
        let a = receipts
        a = a.map(value => {
            if (value._id == id) {
                value.deliveryStatus = status
            }
            return value
        })
        setReceipts(a)
        if (active === 'All') {
            setCurrentReceipts(a)
        } else {
            a = receipts.filter(value => value.deliveryStatus == active)
            setCurrentReceipts(a)
        }
        setCurrentSelect(1)
    }

    

    const renderCount = () => {
        let index = currentReceipts.length
        if (index % 6 == 0) {
            return Number(index / 6)
        } else {
            return Number(Math.floor(index / 6) + 1)
        }
    }

    return (
        <Layout active="admin">
            <Head>
                <title>Quản lý hóa đơn</title>
            </Head>
            <Container className='relative' maxWidth='lg'>
                <NavigationMobile option='receipt'></NavigationMobile>
                <Grid className='mb-16' container spacing={3}>
                    <Grid className='mt-16 min:hidden 900px:block' item md={3}>
                        <Navigation option='receipt'></Navigation>
                    </Grid>
                    <Grid className='mt-16' sm={12} item md={9}>
                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg '>
                            <div className='text-xl font-medium'>Danh sách đơn hàng</div>
                            <div className='flex justify-center my-6'>
                                <ButtonGroup variant="outlined" size='medium' aria-label=" button group small">
                                    <Button onClick={handleClickActive} name='All' className={active === 'All' ? style.orderListActive + ' normal-case border-slate-600 hover:opacity-80 hover:bg-[#2BBCBA] text-white' : 'normal-case border-slate-600'}>Tất cả</Button>
                                    <Button onClick={handleClickActive} name='Chờ xác nhận' className={active === 'Chờ xác nhận' ? style.orderListActive + ' normal-case border-slate-600 hover:opacity-80 hover:bg-[#2BBCBA] text-white' : 'normal-case border-slate-600 '}>Chờ xác nhận</Button>
                                    <Button onClick={handleClickActive} name='Đã xác nhận' className={active === 'Đã xác nhận' ? style.orderListActive + ' normal-case border-slate-600 hover:opacity-80 hover:bg-[#2BBCBA] text-white' : 'normal-case border-slate-600 '}>Đã xác nhận</Button>
                                    <Button onClick={handleClickActive} name='Đang giao' className={active === 'Đang giao' ? style.orderListActive + ' normal-case border-slate-600 hover:opacity-80 hover:bg-[#2BBCBA] text-white' : 'normal-case border-slate-600 '}>Đang giao</Button>
                                    <Button onClick={handleClickActive} name='Đã giao' className={active === 'Đã giao' ? style.orderListActive + ' normal-case border-slate-600 hover:opacity-80 hover:bg-[#2BBCBA] text-white' : 'normal-case border-slate-600 '}>Đã giao</Button>
                                    <Button onClick={handleClickActive} name='Đã hủy' className={active === 'Đã hủy' ? style.orderListActive + ' normal-case border-slate-600 hover:opacity-80 hover:bg-[#2BBCBA] text-white' : 'normal-case border-slate-600 '}>Đã hủy</Button>
                                </ButtonGroup>
                            </div>
                            {/* <div className='flex justify-center mb-3'>
                                <div className='rounded-2xl flex  px-4 py-2 mt-5' style={{ border: '1px solid black', width: '90%' }}>
                                    <SearchIcon className='pr-1 text-3xl cursor-pointer text-[#979797] mr-4' />
                                    <input ref={refInput} onChange={handleChangeSearch} className='w-full outline-none' type='text' placeholder='Tìm kiếm theo ID sách, tên sách, ID đơn hàng'></input>
                                </div>
                            </div> */}
                            {
                                !isLoading ? (
                                    <Stack sx={{ color: 'grey.500', display: 'flex', justifyContent: 'center' }} spacing={2} direction="row">
                                        <CircularProgress color="secondary" />
                                    </Stack>

                                ) : (
                                    <Grid spacing={2}>
                                        {
                                            currentReceipts ? currentReceipts.map((value, index) => {
                                                if (index < currentSelect * 6 && index >= (currentSelect - 1) * 6) {
                                                    return (
                                                        <CardOrderList handleChangeStatus={handleChangeStatus} key={index} receipt={value} status={value.deliveryStatus}></CardOrderList>
                                                    )
                                                }
                                            }) : (<h3 style={{ textAlign: 'center', padding: '30px' }}>Đơn hàng trống</h3>)
                                        }
                                    </Grid>
                                )
                            }
                            <div className='mt-10 flex justify-center profile-pagination'>
                                <Pagination onChange={(e, num) => { setCurrentSelect(num) }} count={renderCount()} color="primary" variant="outlined" />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default receipt;