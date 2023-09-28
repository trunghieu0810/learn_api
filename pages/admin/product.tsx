
import React, { useState, useEffect }from 'react'
import {Button, Container, Grid} from '@mui/material';
import { useDispatch, useSelector, RootStateOrAny} from 'react-redux'
import Head from 'next/head';
import dynamic from 'next/dynamic';
const NavigationMobile = dynamic(() => import('../../component/Admin/NavigationMobile'))
const Navigation = dynamic(() => import('../../component/Admin/Navigation'))
const Layout = dynamic(() => import('../../component/Layout'),
    {
        loading: () => <div></div>
    }
)
import { useRouter } from 'next/router'
import TableManageMent from '../../component/BookPage/TableManageMent';
import * as URL from '../../services/api/config';
import axios from 'axios';
import { showAlertSuccess, showAlertError } from '../../redux/actions/alertAction';
import { loadingBook } from '../../redux/actions/bookAction';
import { getCategory } from '../../redux/actions/categoryAction'; 

const columnDocs = [
    // {field: , headerName: , width: }
    {field: 'stt', headerName: "STT", width: 40},
    {field: 'title', headerName: "Tên sách", width: 130},
    // {field: 'view', headerName: "Số lượt xem"},
    {field: 'author', headerName: "Tên tác giả", width: 120},
    {field: 'date', headerName: "Ngày nhập", width: 100},
    {field: 'sellPrice', headerName: "Phân loại", width: 100},
    {field: 'quantity', headerName: "Số lượng còn lại", width: 100},
    {field: 'type', headerName: "Loại", width: 100},
]

const rowDocs = [
    {
        id: '1', stt: '1', title: 'Ngồi khóc trên cây', author: 'Nguyễn Nhật Ánh', date: "12/12/2001", 
        sellPrice: '12.000', quantity:"10", type:"Loại" 
    }
]

const convertData = (books) => {
    var res = [];
    for(var i = 0; i < books.length; i++){
        res.push({
            id: books[i]._id,
            stt: i+1,
            title: books[i].title,
            author: books[i].author,
            date: books[i].updatedAt.substring(0,10),
            sellPrice: books[i].price,
            quantity: books[i].quantity,
            type: "",
        })
    }
    return res;
}

const columnType = [
    {field: 'stt', headerName: "STT", width: 40},
    {field: 'name', headerName: "Tên loại", width: 130},
    {field: 'number', headerName: "Số sách", width: 130},
]

const convertTypeData = (dataType, books) => {
    var res = [];
    for(var i = 0; i < dataType.length; i++){
        let countType = 0;
        books.forEach((value) => {
            if(value.categoryID.includes(dataType[i]._id)){
                countType++;
            }
        })
        res.push({
            id: dataType[i]._id,
            stt: i+1,
            name: dataType[i].type,
            number: countType,
        })
    }
    return res;
}

const BookPage: React.FC = () => { 
    const router = useRouter();
    const dispatch = useDispatch(); 
    const infoUser = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const status = useSelector((state: RootStateOrAny) => state.userReducer)
    const books = useSelector((state: RootStateOrAny) => state.bookReducer.books);
    const productTypes = useSelector((state: RootStateOrAny)=> {return state.categoryReducer.categories} ) || [];
    const [filter, setFilter] = useState('');
    useEffect(() => {
        const fetchBook= async () => {
            axios.get( URL.URL_PRODUCT, {})
            .then((data) => {
                console.log("get data", data);
                // // alert("Thêm sản phẩm thành công");
                dispatch(showAlertSuccess("Lấy dữ liệu sách thành công"));
                // // console.log(router);
                // router.push('/admin/product/');
                // return true;
                dispatch(loadingBook(data.data.product))
            })
            .catch((error) => {
                dispatch(showAlertSuccess("Lấy dữ liệu sách thất bại"));
                // alert(error);
            })
        }

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

        if (status.isLogin) {
            fetchBook();
            getAllCategory();
        }
    }, [status.isLogin])

    if (!status.isLoading) return (<div></div>)

    if (!status.isLogin) router.push('/login')

    if (infoUser.role == 'user') router.push('/')

    // Get data
    
    console.log("books", books)

    

    return (
        <Layout activeNav={"book"}>
            <Head>
                <title>Quản lý sản phẩm</title>
            </Head>
            <Container className='relative' maxWidth='lg'>
                <NavigationMobile option='product'></NavigationMobile>
                <Grid className='mb-16' container spacing={3}>
                    <Grid className='mt-16 min:hidden 900px:block' item md={3}>
                        <Navigation option='product'></Navigation>
                    </Grid>
                    <Grid className='mt-16 font-primary font-[500] text-[#000]' sm={12} item md={9}>
                        <div className='title text-[#2BBCBA] text-[24px]'>
                            Quản lý sản phẩm
                        </div>
                        
                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg'>
                            <div className='title 
                                text-[22px] font-[600] text-[#000]
                            '>
                                Thông tin sản phẩm
                            </div>
                            <Grid container spacing={1} className='mt-2'>
                                
                                <Grid item md={12} lg={12} sm={12} className='flex'>
                                    <div>Nhập từ bất kỳ để tìm kiếm</div>
                                    <input
                                        className="outline-1 outline-[#999] border-[1px]
                                            focus:outline-none focus-visible:outline-none
                                            ml-[12px] border-[#999] pl-1
                                        "
                                        onChange={(e) =>{
                                            setFilter(e.target.value);
                                        }}
                                    >
                                    </input>
                                </Grid>
                                <Grid item md={12} lg={12} sm={12}>
                                    <TableManageMent
                                        columnDocs={columnDocs} 
                                        rowDocs={convertData(books)} 
                                        filter={filter}
                                        heightProps={500}
                                        manage={true}
                                    />
                                </Grid>
                                
                                <Grid item md={12} lg={12} sm={12}>
                                    <button
                                        className={
                                            "buy-button text-[16px] leading-[40px] bg-[#2BBCBA] px-[20px] text-white rounded-[4px] " +
                                            "hover:opacity-70 hover:cursor-pointer"
                                        }
                                        onClick={() => {
                                            router.push('/admin/product/add-product');
                                        }}
                                    >
                                        Thêm sản phẩm
                                    </button>
                                </Grid>
                                <Grid item md={6} lg={6} sm={6} className="mb-6">
                                    <TableManageMent
                                        columnDocs={columnType} 
                                        rowDocs={convertTypeData(productTypes, books)} 
                                        filter={''}
                                        heightProps={300}
                                        manage={false}
                                    />
                                </Grid>
                                
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}


export default BookPage