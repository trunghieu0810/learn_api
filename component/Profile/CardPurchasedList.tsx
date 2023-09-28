import React from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { useRouter } from 'next/router';
import style from '../../styles/Profile.module.css'

function CardPurchasedList(props) {
    const router = useRouter()
    return (
        <Grid className='cursor-pointer'  onClick={() => { router.push(`/bookpage/${props.product.slug}`) }} item md={4}>
            <Card className=' border-[#2BBCBA] border-1 border-solid mb-6' sx={{boxShadow: 'rgb(0 0 0 / 24%) 0px 3px 8px'}}>
                <img className='w-full h-56' src={props.product.imgList[0]}></img>
                <div className='w-full'>
                    <div className='flex flex-column items-center h-auto pt-2 px-3 pb-6'>
                        <div className='text-[#555555] text-base'>{props.product.author}</div>
                        <div className={style.line + ' text-xl overflow-hidden text-ellipsis leading-[25px] h-[25px]  text-[#2BBCBA] text-center'} >{props.product.title}</div>
                        <div className='font-medium mt-2'>{props.product.price.toLocaleString()} VNĐ</div>
                    </div>
                </div>
            </Card>
        </Grid>
    );
}

export default CardPurchasedList;