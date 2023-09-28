import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import { Container, Grid } from '@mui/material'
import Head from 'next/head';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { showAlertSuccess, showAlertError } from '../../redux/actions/alertAction';
import { useRouter } from 'next/router';
import { resetCart } from '../../redux/actions/cartAction';
const Layout = dynamic(() =>
  import('../../component/Layout'),
  {
    loading: () => <LinearProgress></LinearProgress>
  }
);
import * as URL from '../../services/api/config'
import axios from 'axios';
const InfoUserToPay = dynamic(() => import('../../component/Cart/InfoUserToPay'))
const CartItem = dynamic(() => import('../../component/Cart/CartItem'))

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const cart = useSelector((state: RootStateOrAny) => state.cart)
  const User = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
  const isLogin = useSelector((state: RootStateOrAny) => state.userReducer.isLogin)
  const status = useSelector((state: RootStateOrAny) => state.userReducer)
  console.log(cart.cart)
  if (!status.isLoading) return (<LinearProgress></LinearProgress>)

  const handleClickPayment = async (infoUser) => {
    if (isLogin) {
      let a = {
        ...infoUser,
        total: cart.cart.reduce((total, value) => { return total += value.product.price * value.quantity }, 0),
        totalFinal: cart.cart.reduce((total, value) => { return total += value.product.price * value.quantity }, 0) > cart.cart.reduce((total, value) => { return total += value.product.price * value.quantity }, 0) ? 0 : cart.cart.reduce((total, value) => { return total += value.product.price * value.quantity }, 0) + 25000,
        deliveryMoney: cart.cart.reduce((total, value) => { return total += value.product.price * value.quantity }, 0) > 1000000 ? 0 : 25000,
        user: User._id,
        listProduct: cart.cart
      }
      if (a.name == '') {
        a.name = User.name
      }
      if (a.phone == '') {
        a.phone = User.phone
      }


      if (a.district == '' || a.province == '' || a.commune == '' || a.address == '' || a.note == '' || a.paymentMethod == '') {
        dispatch(showAlertError("Nhập đầy đủ thông tin!"))
      } else if (cart.cart.length == 0) {
        dispatch(showAlertError("Giỏ hàng trống!"))
      } else {
        await axios.post(URL.URL_CREATE_RECEIPT, { ...a })
          .then(res => {
            console.log(res)
            if (res.data.success) {
              dispatch(showAlertSuccess('Đặt hàng thành công'))
              dispatch(resetCart())
            }
          })
          .catch(err => {
            dispatch(showAlertError("Lỗi hệ thống!"))
          })
      }
    } else {
      router.push('/login')
    }
  }

  const renderTotal = (listCart) => {
    if (listCart.length == 0) {
      return 0
    }
    return listCart.reduce((total, value) => { return total += value.product?.price * value.quantity }, 0)
  }

  return (
    <Layout>
      <Head>
        <title>Cart</title>
      </Head>
      <Container>
        <Grid container spacing={2}>
          <Grid sm={6}>
            <InfoUserToPay handleClickPayment={handleClickPayment}></InfoUserToPay>
          </Grid>
          <Grid sm={6}>
            <div className={'p-4 relative'}>
              <div className='pt-10'>
                <div className='text-3xl font-bold mb-10'>Giỏ hàng</div>
                {/* Giỏ hàng */}
                <div>
                  <div>
                    {
                      cart.cart.length !== 0 ? cart.cart.map(cart => {
                        return (
                          <CartItem detailCart={cart}></CartItem>
                        )
                      }) : (
                        <h4 style={{ textAlign: 'center', marginBottom: '30px' }}>Giỏ hàng trống</h4>
                      )
                    }
                  </div>
                  <div style={{ display: 'flex', height: '50px', border: '1px solid black', borderRadius: '20px', backgroundColor: '#D9d9d9', overflow: 'hidden' }}>
                    <input placeholder='Mã giảm giá' style={{ fontWeight: '500', paddingBottom: '5px', paddingLeft: '20px', width: '70%', height: '50px', borderRight: '1px solid black', outline: 'none', borderRadius: '20px' }} type='text'></input>
                    <div style={{ cursor: 'not-allowed', width: '30%', fontWeight: '600', height: '50px', textAlign: 'center', lineHeight: '45px' }}>Áp dụng</div>
                  </div>
                  <div style={{ borderTop: '1px solid #00000021', borderBottom: '1px solid #00000021', marginTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', fontSize: '14px', fontWeight: '500' }}>
                      <div>Tạm tính</div>
                      <div>{renderTotal(cart.cart).toLocaleString()}đ</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', fontSize: '14px', fontWeight: '500' }}>
                      <div>Giảm giá</div>
                      <div>0đ</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', fontSize: '14px', fontWeight: '500' }}>
                      <div>Phí giao hàng</div>
                      <div>+{renderTotal(cart.cart) > 1000000 ? 0 : (25000).toLocaleString()}đ</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', fontSize: '18px', fontWeight: '600' }}>
                    <div>TỔNG</div>
                    <div>{renderTotal(cart.cart) > 1000000 ? renderTotal(cart.cart).toLocaleString() : (25000 + renderTotal(cart.cart)).toLocaleString()}đ</div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Cart



