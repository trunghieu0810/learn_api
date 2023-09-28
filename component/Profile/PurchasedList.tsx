import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import dynamic from 'next/dynamic';
import axios from 'axios';
import * as URL from '../../services/api/config';
import { useSelector, RootStateOrAny } from 'react-redux';


const CardPurchasedList = dynamic(() => import('./CardPurchasedList'))

const PurchasedList = (props) => {
    const userInfo = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const [isLoading, setIsLoading] = useState(false)
    const [listPurchased, setListPurchased] = useState([])
    const [currentSelect, setCurrentSelect] = useState(1)

    useEffect(() => {
        const fetApi = async () => {
            await axios.post(URL.URL_GET_PURCHASED_BOOK, { id: userInfo._id })
                .then(res => {
                    setListPurchased(res.data.products)
                    setIsLoading(true)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetApi()
    }, [])

    const renderCount = () => {
        let index = listPurchased.length
        if (index % 6 == 0) {
            return Number(index / 6)
        } else {
            return Number(Math.floor(index / 6) + 1)
        }
    }

    return (
        <div>
            <div className='text-xl text-[#2BBCBA]'>Danh sách đã mua</div>
            <div className='mt-4'>
                {
                    isLoading ? (
                        <Grid container spacing={5}>
                            {
                                listPurchased.length !== 0 ? listPurchased.map((product, index) => {
                                    if (index < currentSelect * 6 && index >= (currentSelect - 1) * 6) {
                                        return (
                                            <CardPurchasedList key={index} product={product}></CardPurchasedList>
                                        )
                                    }
                                }) : (<h5 className='w-100 text-center mt-4'>Bạn hiện tại chưa mua sản phẩm nào</h5>)
                            }
                        </Grid>
                    ) : (
                        <Stack sx={{ color: 'grey.500', display: 'flex', justifyContent: 'center' }} spacing={2} direction="row">
                            <CircularProgress color="secondary" />
                        </Stack>
                    )
                }

            </div>
            <div className='mt-10 flex justify-center profile-pagination'>
                <Pagination onChange={(e, num) => { setCurrentSelect(num) }} count={renderCount()} color="primary" variant="outlined" />
            </div>
        </div >
    )
}

export default PurchasedList