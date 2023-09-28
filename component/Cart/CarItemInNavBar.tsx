import * as React from 'react';
import Grid from '@mui/material/Grid'
import { Divider } from '@mui/material';
import { MdDelete } from 'react-icons/md'
import style from '../../styles/Cart.module.css'
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../redux/actions/cartAction';
import axios from 'axios';
import * as URL from '../../services/api/config'
import { useSelector, RootStateOrAny } from 'react-redux';
const CartItemInNavBar = (props) => {
    const infoUser = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const dispatch = useDispatch()
    const handleDelete = async () => {
        await axios.post(URL.URL_QUANTITY_CHANGE, { id: infoUser?._id, type: 'DELETE', idProduct: props.detailCart.product?._id })
            .then(res => {
                dispatch(deleteItem(props.detailCart.product._id))
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <Grid className='mb-3' container spacing={0}>
            <Grid sm={3}>
                <img height='120px' className=' rounded-2xl' src={props.detailCart.product ? props.detailCart.product.imgList[0] : null} alt={props.detailCart.product ? props.detailCart.product.title : 'Lỗi'} />
            </Grid>
            <Grid sm={9}>
                <div className='flex pl-2  justify-between'>
                    <div className='font-medium w-3/4 text-sm'>
                        <p className={'pb-0 mb-1 ' + style.limitText}>{props.detailCart.product?.title}</p>
                        <div className='font-normal'>
                            Thể loại: <span className='font-medium'>Pháp luật</span>
                        </div>
                        <div className='font-normal'>
                            Số lượng: <span className='font-medium'>{props.detailCart.quantity}</span>
                        </div>
                    </div>
                    <div className='w-1/4 flex flex-column justify-between items-end'>
                        <div onClick={handleDelete} className={'cursor-pointer hover:scale-110'}>
                            <MdDelete></MdDelete>
                        </div>
                        <div>
                            <div className='font-medium'>
                                {props.detailCart.product?.price.toLocaleString()}đ
                            </div>
                            <div className='line-through text-[#ccc] font-medium'>
                                {(props.detailCart.product?.price + 20000).toLocaleString()}đ
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid className='my-2' sm={12}>
                <Divider></Divider>
            </Grid>
        </Grid>
    )
}

export default CartItemInNavBar