import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { Card, Divider, Grid, TextField, Box, Button, CardContent, Container, Tab, Tabs } from '@mui/material';
import style from '../styles/Home.module.css'

const SliderCourses = dynamic(() => import('./SliderCourses'))

function GoodBook(props) {
    return (
        <div className='mt-5 mb-5' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} >
            <Card style={{ overflow: 'inherit' }}>
                <div className='text-xl p-3 font-medium'>Sách hay</div>
                <Divider />
                <CardContent>
                    <div className='my-3'>Tổng hợp những cuốn sách được đánh giá cao nhất</div>
                    <SliderCourses></SliderCourses>
                </CardContent>
            </Card>
        </div>
    );
}

export default GoodBook;