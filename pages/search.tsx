import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as URL from '../services/api/config'
import { memo } from 'React'
import Stack from '@mui/material/Stack';
const NavigationBar = dynamic(() => import('../component/Search/NavigationBar'))
const CardPurchasedList = dynamic(() => import('../component/Search/CardPurchasedList'))
const Layout = dynamic(() => import('../component/Layout'),
    {
        loading: () => <LinearProgress></LinearProgress>
    }
)



function search(props) {
    const search = useSelector((state: RootStateOrAny) => state.searchReducer.search)
    const router = useRouter()
    const [products, setProducts] = useState({
        isLoading: false,
        products: []
    })
    const [currentSelect, setCurrentSelect] = useState(1)
    const [currentProducts, setCurrentProducts] = useState([])



    useEffect(() => {
        setProducts({
            isLoading: false,
            products: []
        })
        let a = setTimeout(() => {
            router.push(`/search?search=${search}`)
            const fetApi = async () => {
                await axios.get(URL.URL_GET_SEARCH + search)
                    .then(res => {
                        console.log(res)
                        setProducts({
                            isLoading: true,
                            products: res.data.products
                        })
                        setCurrentProducts(res.data.products)
                    })
                    .catch(err => {

                    })
            }
            fetApi()
            console.log(search)
        }, 500)
        return () => clearTimeout(a)
    }, [search])

    const renderCount = () => {
        let index = currentProducts.length
        if (index % 12 == 0) {
            return Number(index / 12)
        } else {
            return Number(Math.floor(index / 12) + 1)
        }
    }

    return (
        <Layout>
            <Head>
                <title>Tìm kiếm - {search}</title>
            </Head>
            <Container className='relative' maxWidth='xl'>
                <Grid className='mb-16' container spacing={3}>
                    <Grid className='mt-16' item md={4} sm={12}>
                        <div
                            style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }}
                            className='rounded-lg '
                        >
                            <NavigationBar></NavigationBar>
                        </div>
                    </Grid>
                    <Grid className='mt-16' item md={8} sm={12}>
                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg '>
                            {
                                search == '' ? (
                                    <>
                                        <div className='text-xl font-bold mb-2'>Tất cả loại sách</div>
                                    </>
                                ) : (
                                    <>
                                        <div className='text-xl font-bold mb-2'>Kết quả tìm kiếm cho "<span className='text-[#2BBCBA]'>{search}</span>"</div>
                                    </>
                                )
                            }
                            <div className='mb-4'>Tổng cộng <span className='text-[#2BBCBA]'>{currentProducts.length}</span> sách được tìm thấy</div>
                            {
                                !products.isLoading ? (
                                    <Stack sx={{ color: 'grey.500', display: 'flex', justifyContent: 'center' }} spacing={2} direction="row">
                                        <CircularProgress color="secondary" />
                                    </Stack>
                                ) : (
                                    <Grid container spacing={3}>
                                        {
                                            currentProducts.length == 0 ? (<h5 className='mt-4' style={{ textAlign: 'center', display: 'block', width: '100%' }}>Không tìm thấy sản phẩm</h5>) : (
                                                currentProducts.map((product, key) => {
                                                    if (key < currentSelect * 12 && key >= (currentSelect - 1) * 12) {
                                                        return (
                                                            <CardPurchasedList product={product} key={key}></CardPurchasedList>
                                                        )
                                                    }
                                                })
                                            )
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

export default memo(search);