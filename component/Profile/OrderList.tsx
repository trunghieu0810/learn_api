import React, { useState, useEffect, useMemo } from 'react';
import { ButtonGroup, Button, CircularProgress, Stack } from '@mui/material';
import style from '../../styles/Profile.module.css'
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import axios from 'axios';
import * as URL from '../../services/api/config'
const CardOrderList = dynamic(() => import('./CardOrderList'))
const OrderList = (props) => {
    const userInfo = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const status = useSelector((state: RootStateOrAny) => state.userReducer)
    const [isLoading, setIsLoading] = useState(false)
    const [receipts, setReceipts] = useState([])
    const [currentReceipts, setCurrentReceipts] = useState([])
    const [active, setActive] = useState('')
    const [currentSelect, setCurrentSelect] = useState(1)

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


    useEffect(() => {
        const fetApi = async () => {
            await axios.get(URL.URL_GET_ORDER_LIST + `?id=${userInfo._id}`)
                .then(res => {
                    setReceipts(res.data.receipts)
                    setCurrentReceipts(res.data.receipts)
                    setIsLoading(true)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        if (status.isLogin) {
            fetApi()
        }
    }, [status.isLogin])

    const handleClickActive = (e) => {
        setActive(e.target.name)
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
        <div>
            <div className='text-xl text-[#2BBCBA]'>Danh sách đơn hàng</div>
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
            {/* <div className='flex justify-center mb-2.5'>
                <div className='rounded-2xl flex  px-4 py-2 mt-10' style={{ border: '1px solid black', width: '90%' }}>
                    <SearchIcon className='pr-1 text-3xl cursor-pointer text-[#979797] mr-4' />
                    <input className='w-full outline-none' type='text' placeholder='Tìm kiếm theo ID sách, tên sách, ID đơn hàng'></input>
                </div>
            </div> */}
            <div>
                {
                    isLoading ? (
                        <div>
                            {
                                currentReceipts.length !== 0 ? currentReceipts.map((value, index) => {
                                    if (index < currentSelect * 6 && index >= (currentSelect - 1) * 6) {
                                        return (
                                            <CardOrderList handleChangeStatus={handleChangeStatus} key={index} receipt={value} status={value.deliveryStatus}></CardOrderList>
                                        )
                                    }
                                }) : (
                                    <h3 style={{ textAlign: 'center', padding: '30px' }}>Đơn hàng trống</h3>
                                )
                            }
                        </div>
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
        </div>
    )
}

export default OrderList
