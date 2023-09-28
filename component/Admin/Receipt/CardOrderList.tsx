import React, { useState } from 'react';
import { Divider } from '@mui/material';
import { ImSigma } from 'react-icons/im'
import Card from '@mui/material/Card';
import { SiClockify } from 'react-icons/si'
import { FaShippingFast, FaUserClock } from 'react-icons/fa'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import ModalDetailOrder from '../../Profile/ModalDetailOrder'
import axios from 'axios';
import * as URL from '../../../services/api/config'
import { useDispatch } from 'react-redux'
import { showAlertSuccess, showAlertError } from '../../../redux/actions/alertAction'
function CardOrderList(props) {
    const dispatch = useDispatch()

    const handleConform = async (type) => {
        await axios.post(URL.URL_POST_CONFORM_RECEIPT, { deliveryStatus: type, receipt: props.receipt })
            .then(res => {
                if (res.data.status == 202) {
                    dispatch(showAlertError(res.data.message))
                } else {
                    dispatch(showAlertSuccess(`Chuyển trạng thái sang ${type} thành công`))
                    props.handleChangeStatus(props.receipt._id, type)
                }
            })
            .catch(err => {
                dispatch(showAlertError(`Lỗi hệ thống`))
                console.log(err)
            })
    }
    const [isShowModalDetail, setIsShowModalDetail] = useState(false)

    const renderStatus = () => {
        switch (props.status) {
            case 'Chờ xác nhận':
                return (
                    <>
                        <SiClockify className='text-[#2BBCBA] text-base'></SiClockify>
                        <div className='ml-5 text-base text-[#2BBCBA]'>Chờ xác nhận</div>
                    </>
                )
            case 'Đã xác nhận':
                return (
                    <>
                        <FaShippingFast className='text-[#2BBCBA] text-base'></FaShippingFast>
                        <div className='ml-5 text-base text-[#2BBCBA]'>Đã xác nhận</div>
                    </>
                )
            case 'Đang giao':
                return (
                    <>
                        <FaUserClock className='text-[#2BBCBA] text-base'></FaUserClock>
                        <div className='ml-5 text-base text-[#2BBCBA]'>Đang giao</div>
                    </>
                )
            case 'Đã giao':
                return (
                    <>
                        <AiFillCheckCircle className='text-[#2BBCBA] text-base'></AiFillCheckCircle>
                        <div className='ml-5 text-base text-[#2BBCBA]'>Đã giao</div>
                    </>
                )
            case 'Đã hủy':
                return (
                    <>
                        <MdCancel className='text-[#FF9E37] text-xl'></MdCancel>
                        <div className='ml-5 text-base text-[#FF9E37]'>Đã hủy</div>
                    </>
                )
            default:
                return (
                    <>
                        Lỗi
                    </>
                )
        }
    }


    const renderButton = () => {
        switch (props.status) {
            case 'Chờ xác nhận':
                return (
                    <>
                        <div className='h-auto py-1 px-2 text-xs rounded text-white bg-[#FF9E37] cursor-pointer'>HỦY ĐƠN</div>
                    </>
                )
            case 'Đã xác nhận':
                return (
                    <>
                    </>
                )
            case 'Đang giao':
                return (
                    <>
                    </>
                )
            case 'Đã giao':
                return (
                    <>
                        <div className='mr-2 py-1 px-2 text-xs rounded text-black bg-white border-solid border-1 border-black'>ĐÁNH GIÁ</div>
                        <div className='py-1 px-2 text-xs rounded text-white bg-[#2BBCBA]'>MUA LẠI</div>
                    </>
                )
            case 'Đã hủy':
                return (
                    <>
                        <div className='py-1 px-2 text-xs rounded text-white bg-[#2BBCBA]'>MUA LẠI</div>
                    </>
                )
            default:
                return (
                    <>
                        Lỗi
                    </>
                )
        }
    }

    return (
        <div className='mb-4'>
            <div style={{ display: isShowModalDetail ? 'block' : 'none' }}>
                <ModalDetailOrder receipt={props.receipt} hideModal={() => { setIsShowModalDetail(false) }}></ModalDetailOrder>
            </div>
            <Card onClick={() => { setIsShowModalDetail(true) }} className='px-9 py-6 mb-4 pt-12 border-solid border-1 border-black cursor-pointer relative' sx={{ display: 'flex' }}>
                <div className='flex justify-end items-center absolute right-2 top-2'>
                    {renderStatus()}
                </div>
                <div className='flex justify-end items-center absolute left-9 top-2'>
                    Mã HD:  <span className='pl-1 font-bold'> {props.receipt._id}</span>
                </div>
                <div className='w-full'>
                    {
                        props.receipt.listProduct.map((value, key) => (
                            <>
                                <div className='flex  h-auto mb-3' >
                                    <img className='rounded-lg border-[#2BBCBA] border-1 border-solid mr-3 h-[80px] w-[60px]' height={40} width={88} src={value.product.imgList[0]}></img>
                                    <div className='flex justify-between w-[100%]'>
                                        <div className='flex flex-col'>
                                            <div>
                                                <div className='font-medium text-lg'>{value.product.title}</div>
                                                <div className='text-base text-[#555555]'>{value.product.author}</div>
                                                <div className='text-base font-medium'>x {value.quantity}</div>
                                            </div>
                                        </div>
                                        <div className='flex  flex-col justify-end'>
                                            <div className='flex items-end mt-3'>
                                                <div className='text-base text-[#2BBCBA]'>{(value.product.price).toLocaleString()}đ</div>
                                                <div className='ml-5  text-2xl font-medium'>{(value.quantity * value.product.price).toLocaleString()}đ</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Divider className='h-px border-solid border-1 border-[#C5C5C5] my-1 mt-2' ></Divider>
                            </>
                        ))
                    }
                    <div className='flex justify-end mt-2'>

                        <div className='flex items-center'>
                            <ImSigma className='text-xl'></ImSigma>
                            <div className='ml-5 text-2xl font-medium'>220.000đ</div>
                        </div>
                    </div>
                </div>
            </Card>
            <div className='flex justify-center mt-2 '>
                {
                    props.status == 'Đã giao' ? null : (
                        props.status == 'Đã hủy' ? (
                            <>
                                <div onClick={() => handleConform('Chờ xác nhận')} className='px-3 py-1 bg-[#5fd078] text-white text-sm rounded cursor-pointer mx-2'>MUA LẠI</div>
                            </>
                        ) : (
                            <>
                                <div onClick={() => handleConform('Đã hủy')} className='px-3 py-1 bg-[#d48026] text-white text-sm rounded cursor-pointer mx-2'>HUỶ ĐƠN</div>
                                <div onClick={() => handleConform('Đã xác nhận')} className='px-3 py-1 bg-[#5fd078] text-white text-sm rounded cursor-pointer mx-2'>XÁC NHẬN</div>
                                <div onClick={() => handleConform('Đang giao')} className='px-3 py-1 bg-[#74BFCF] text-white text-sm rounded cursor-pointer mx-2'>ĐANG GIAO</div>
                                <div onClick={() => handleConform('Đã giao')} className='px-3 py-1 bg-[#AE75D0] text-white text-sm rounded cursor-pointer mx-2'>ĐÃ GIAO</div>
                            </>
                        )
                    )
                }
            </div>
            <Divider className='rounded-xl  my-4' style={{ height: '2px' }}></Divider>
        </div>
    );
}

export default CardOrderList;