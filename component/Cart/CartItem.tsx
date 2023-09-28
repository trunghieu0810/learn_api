import React from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { Container, Grid, Badge } from '@mui/material'
import style from '../../styles/Cart.module.css'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { minusItem, plusItem, deleteItem } from '../../redux/actions/cartAction'
import * as URL from '../../services/api/config'
import axios from 'axios'

function CartItem(props) {
  const dispatch = useDispatch()
  const infoUser = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
  const handleDelete = async () => {
    await axios.post(URL.URL_QUANTITY_CHANGE, { id: infoUser?._id, type: 'DELETE', idProduct: props.detailCart.product?._id })
      .then(res => {
        dispatch(deleteItem(props.detailCart.product._id))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleMinus = async () => {
    if (props.detailCart.quantity <= 1) {
      await axios.post(URL.URL_QUANTITY_CHANGE, { id: infoUser?._id, type: 'DELETE', idProduct: props.detailCart.product?._id })
        .then(res => {
          dispatch(deleteItem(props.detailCart.product?._id))
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      await axios.post(URL.URL_QUANTITY_CHANGE, { id: infoUser?._id, type: 'MINUS', idProduct: props.detailCart.product?._id })
        .then(res => {
          dispatch(minusItem(props.detailCart.product?._id))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const handlePlus = async () => {
    await axios.post(URL.URL_QUANTITY_CHANGE, { id: infoUser._id, type: 'PLUS', idProduct: props.detailCart.product?._id })
      .then(res => {
        dispatch(plusItem(props.detailCart.product?._id))
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <Container className='mb-16'>
      <Grid className={style.cartItem + ' rounded-2xl'} container spacing={2}>
        <Grid className='pt-1 pb-1' sm={3}>
          <Badge badgeContent={props.detailCart.quantity} color={'warning'}>
            <img height='150px' className=' rounded-2xl' src={props.detailCart.product?.imgList[0]} alt={props.detailCart.product?.title} />
          </Badge>
        </Grid>
        <Grid className='pl-4' sm={7}>
          <div className='font-medium mb-2'>
            {props.detailCart.product?.title}
          </div>
          <div className='mb-2'>
            Thể loại: <span className='font-medium'>Pháp luật</span>
          </div>
          <div className='flex items-center'>
            <span onClick={handleMinus} className='text-2xl cursor-pointer'>
              <AiFillMinusCircle></AiFillMinusCircle>
            </span>
            <span className='mx-2' style={{ border: '1px solid black', borderRadius: '8px', padding: '4px 10px' }}>{props.detailCart.quantity}</span>
            <span onClick={handlePlus} className='text-2xl cursor-pointer'>
              <AiFillPlusCircle></AiFillPlusCircle>
            </span>
          </div>
        </Grid>
        <Grid sm={2}>
          <div className='flex flex-column justify-between items-end h-full p-2'>
            <div onClick={handleDelete} className={'cursor-pointer' + ' ' + style.deleteCart}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartItem;