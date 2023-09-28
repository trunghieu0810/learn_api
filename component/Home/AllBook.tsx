import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { Card, Divider, Grid, TextField, Box, Button, CardContent, Container, Tab, Tabs } from '@mui/material';
import style from '../styles/Home.module.css'
import { useSelector, RootStateOrAny} from 'react-redux';
const SliderCourses = dynamic(() => import('./SliderCourses'))
function AllBook(props) {
    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    console.log(value);



    const productType = useSelector((state: RootStateOrAny)=> {return state.categoryReducer.categories} ) || [];
    const listBook = useSelector((state: RootStateOrAny) => {
        return [
            ...state.bookReducer.books,
            ...state.bookReducer.books,
            ...state.bookReducer.books,
            ...state.bookReducer.books,
            ...state.bookReducer.books,
            ...state.bookReducer.books,
            ...state.bookReducer.books,
        ]
    })

    

    return (
        <div className='mt-20 mb-5' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} >
            <Card style={{ overflow: 'inherit' }}>
                <div className='text-xl p-3 font-medium'>Tất cả loại sách</div>
                <Divider />
                <CardContent>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                {
                                    productType.map((value, index)=> {
                                        return (<Tab label={value.type} {...a11yProps(index)} />);
                                    })
                                }
                                
                                {/* <Tab label="Ngôn tình" {...a11yProps(1)} />
                                <Tab label="Kỹ năng" {...a11yProps(2)} />
                                <Tab label="Kinh tế" {...a11yProps(3)} />
                                <Tab label="Sách giáo khoa" {...a11yProps(4)} />
                                <Tab label="Chính trị" {...a11yProps(5)} /> */}
                            </Tabs>
                        </Box>
                    </Box>
                    <div className='my-3'>Tiểu thuyết là một thể loại văn xuôi có hư cấu, thông qua nhân vật, hoàn cảnh, sự việc để phản ánh bức tranh xã hội rộng lớn và những vấn đề của cuộc sống con người, biểu hiện tính chất tường thuật, tính chất kể chuyện bằng ngôn ngữ văn xuôi theo những chủ đề xác định</div>
                    <SliderCourses
                        // books
                        productType={productType[value]&&(typeof productType[value]._id != 'undefined') ? productType[value]._id : ""}
                        books = {listBook}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default AllBook;