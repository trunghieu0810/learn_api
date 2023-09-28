import React from 'react';
import {Divider, Grid, TextField } from '@mui/material'
import { BiExit } from 'react-icons/bi'


function ModalDetailOrder(props) {

    const stopPropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <div onClick={props.hideModal} className='profile-modal bg-[#00000040] fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center'>
            <div
                onClick={stopPropagation}
                className='bg-white height-auto min-h-8/12 rounded-md shadow-md p-10 min-w-[500px] w-[700px] relative'
            >
                <div onClick={props.hideModal} className='absolute right-0 top-0 m-3 hover:text-[#2BBCBA] cursor-pointer ease-in-out duration-100 transition hover:scale-110 '>
                    <BiExit className='text-2xl'></BiExit>
                </div>
                <div className='text-2xl font-medium text-[#2bbcba] mb-4'>Chi tiết đơn hàng</div>
                <Divider className='h-[1px] w-full text-slate-300 mb-3'></Divider>
                <Grid className='my-3 mx-0 pr-4' container spacing={2}>
                    <Grid className='font-medium text-base' xs={6}>
                        Họ tên
                    </Grid>
                    <Grid xs={6}>
                        <TextField value={props.receipt.name} disabled fullWidth id="outlined-basic" label='Họ tên' variant="outlined" size='small' />
                    </Grid>
                </Grid>
                <Divider className='h-[1px] w-full text-slate-300 mb-3'></Divider>
                <Grid className='my-3 mx-0 pr-4' container spacing={2}>
                    <Grid className='font-medium text-base' xs={6}>
                        Số điện thoại
                    </Grid>
                    <Grid xs={6}>
                        <TextField value={props.receipt.phone} disabled fullWidth id="outlined-basic" label='Họ tên' variant="outlined" size='small' />
                    </Grid>
                </Grid>
                <Divider className='h-[1px] w-full text-slate-300 mb-3'></Divider>
                <Grid className='my-3 mx-0 pr-4' container spacing={2}>
                    <Grid className='font-medium text-base' xs={6}>
                        Ghi chú
                    </Grid>
                    <Grid xs={6}>
                        <TextField value={props.receipt.note} disabled fullWidth id="outlined-basic" label='Họ tên' variant="outlined" size='small' />
                    </Grid>
                </Grid>
                <Divider className='h-[1px] w-full text-slate-300 mb-3'></Divider>
                <Grid className='my-3 mx-0 pr-4' container spacing={2}>
                    <Grid className='font-medium text-base' xs={6}>
                        Địa chỉ
                    </Grid>
                    <Grid xs={6}>
                        <TextField value={props.receipt.address+', '+props.receipt.commune+', '+props.receipt.district+', '+props.receipt.province} disabled fullWidth multiline maxRows={4} id="standard-multiline-flexible" label='Họ tên' variant="outlined" size='small' />
                    </Grid>
                </Grid>
                <Divider className='h-[1px] w-full text-slate-300 mb-3'></Divider>
                <Grid className='my-3 mx-0 pr-4' container spacing={2}>
                    <Grid className='font-medium text-base' xs={6}>
                        Phương thức giao dịch
                    </Grid>
                    <Grid xs={6}>
                        <TextField value={props.receipt.paymentMethod} disabled fullWidth id="outlined-basic" label='Họ tên' variant="outlined" size='small' />
                    </Grid>
                </Grid>
                <Divider className='h-[1px] w-full text-slate-300 mb-3'></Divider>
                <Grid className='my-3 mx-0 pr-4' container spacing={2}>
                    <Grid className='font-medium text-base' xs={6}>
                    Tổng tiền
                    </Grid>
                    <Grid xs={6}>
                        <TextField value={props.receipt.total.toLocaleString()} disabled fullWidth id="outlined-basic" label='Họ tên' variant="outlined" size='small' />
                    </Grid>
                </Grid>
                <Divider className='h-[1px] w-full text-slate-300 mb-3'></Divider>
                <Grid className='my-3 mx-0 pr-4' container spacing={2}>
                    <Grid className='font-medium text-base' xs={6}>
                        Phí giao hàng
                    </Grid>
                    <Grid xs={6}>
                        <TextField value={props.receipt.deliveryMoney.toLocaleString()} disabled fullWidth id="outlined-basic" label='Họ tên' variant="outlined" size='small' />
                    </Grid>
                </Grid>
                <Divider className='h-[1px] w-full text-slate-300 mb-3'></Divider>
                <Grid className='my-3 mx-0 pr-4' container spacing={2}>
                    <Grid className='font-medium text-base' xs={6}>
                        TỔNG TIỀN CUỐI CÙNG
                    </Grid>
                    <Grid xs={6}>
                        <TextField value={props.receipt.totalFinal.toLocaleString()} disabled fullWidth id="outlined-basic" label='Họ tên' variant="outlined" size='small' />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ModalDetailOrder;