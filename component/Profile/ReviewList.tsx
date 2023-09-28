import React, { useState } from 'react';
import style from '../../styles/Profile.module.css'
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import dynamic from 'next/dynamic';

const CardReviewList = dynamic(() => import('./CardReviewList'))

const ReviewList = (props) => {




    return (
        <div>
            <div className='text-xl text-[#2BBCBA]'>Danh sách review</div>
            <div className='flex justify-center mb-3'>
                <div className='rounded-2xl flex  px-4 py-2 mt-5' style={{ border: '1px solid black', width: '90%' }}>
                    <SearchIcon className='pr-1 text-3xl cursor-pointer text-[#979797] mr-4' />
                    <input className='w-full outline-none' type='text' placeholder='Tìm kiếm theo ID sách, tên sách, ID đơn hàng'></input>
                </div>
            </div>
            <div>
                <CardReviewList ></CardReviewList>
                <CardReviewList ></CardReviewList>
                <CardReviewList ></CardReviewList>
                <CardReviewList ></CardReviewList>
            </div>
            <div className='mt-10 flex justify-center profile-pagination'>
                <Pagination count={10} color="primary" variant="outlined" />
            </div>
        </div>
    )
}

export default ReviewList