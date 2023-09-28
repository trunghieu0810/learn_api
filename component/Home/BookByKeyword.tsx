import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { Card, Divider, Grid, TextField, Box, Button, CardContent, Container, Tab, Tabs } from '@mui/material';
import style from '../styles/Home.module.css'
const SliderCourses = dynamic(() => import('./SliderCourses'))

function BookByKeyword(props) {
    return (
        <div className='mt-5 mb-5' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} >
            <Card style={{ overflow: 'inherit' }}>
                <div className='text-xl p-3 font-medium'>Sách theo từ khóa</div>
                <Divider />
                <CardContent>
                    <div className='my-3'>Tổng hợp những cuốn sách theo từ khoá hot nhất</div>
                    <div className='my-3 flex text-[white] '>
                        <div className='px-3 py-1 text-base rounded-lg bg-[#C4C4C4] mr-4'>Nguyễn Nhật Ánh</div>
                        <div className='px-3 py-1 text-base rounded-lg bg-[#BEC7E7] mr-4'>cà khịa</div>
                        <div className='px-3 py-1 text-base rounded-lg bg-[#DEBEE7] mr-4'>hot hit</div>
                        <div className='px-3 py-1 text-base rounded-lg bg-[#DEBEE7] mr-4'>tuổi trẻ</div>
                        <div className='px-3 py-1 text-base rounded-lg bg-[#DEBEE7] mr-4'>thanh xuân</div>
                    </div>
                    <SliderCourses></SliderCourses>
                </CardContent>
            </Card>
        </div>
    );
}

export default BookByKeyword;