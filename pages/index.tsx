import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { Card, Divider, Grid, TextField, Box, Button, CardContent, Container, Tab, Tabs } from '@mui/material';
import style from '../styles/Home.module.css'
import { useDispatch } from 'react-redux';
import * as URL from '../services/api/config';
import { useRouter } from 'next/router';

const Layout = dynamic(() =>
  import('../component/Layout'),
  {
    loading: () => <LinearProgress></LinearProgress>
  }
);
const AllBook = dynamic(() => import('../component/Home/AllBook'))
const BookByKeyword = dynamic(() => import('../component/Home/BookByKeyword'))
const GoodBook = dynamic(() => import('../component/Home/GoodBook')) 
const NewBook = dynamic(() => import('../component/Home/NewBook'))
import {getCategory} from '../redux/actions/categoryAction'; 
import {loadingBook } from '../redux/actions/bookAction';


const Home = () => {
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
      const getAllCategory = async() => {
          // console.log("dispatch category rồi");
          var categoryList;
          await axios.get(URL.URL_CATEGORY)
              .then((data)=>{
                  categoryList = data.data;
              })
              .catch((error)=>{
                  // navigate to login
                  router.push('/')
                  console.log(error)
              })
          dispatch(getCategory(categoryList.categories));
      }
      getAllCategory();
      const fetchBook= async () => {
        axios.get( URL.URL_PRODUCT, {})
        .then((data) => {
            console.log("get data", data);
            // // alert("Thêm sản phẩm thành công");
            // dispatch(showAlertSuccess("Lấy dữ liệu sách thành công"));
            // // console.log(router);
            // router.push('/admin/product/');
            // return true;
            dispatch(loadingBook(data.data.product))
        })
        .catch((error) => {
            // dispatch(showAlertSuccess("Lấy dữ liệu sách thất bại"));
            // alert(error);
        })
    }
    fetchBook()
  }, [])

  return (
    <Layout active="home">
      <div className={style.backgroundHome}>
        <div
          className='rounded-xl  absolute  text-[#2BBCBA]  xl:text-6xl xl:translate-x-20   lg:text-5xl lg:translate-x-15  900px:text-4xl 900px:translate-x-10  md:text-3xl md:translate-x-10  sm:text-2xl   min:text-xl min:translate-x-5 min:top-1/4 min:right-1/4 '
        >
          SELLING BOOK
        </div>
        <div
          className='rounded-xl cursor-pointer absolute  bg-[#2BBCBA] text-white xl:text-4xl   xl:py-3 xl:px-6 lg:text-3xl  lg:py-3 lg:px-6 900px:text-3xl  900px:py-2 900px:px-4 md:text-2xl  md:py-2 md:px-4 sm:text-xl  sm:py-2 sm:px-4 min:text-base min:bottom-1/4 min:right-1/4 min:py-1 min:px-3'
        >
          XEM TẤT CẢ
        </div>
      </div>
      <Container maxWidth={'xl'} style={{ overflow: 'inherit' }}>
        <AllBook></AllBook>
        <BookByKeyword></BookByKeyword>
        <GoodBook></GoodBook>
        <NewBook></NewBook>
      </Container>
    </Layout>
  )
}


export default Home

