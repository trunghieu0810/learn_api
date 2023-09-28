import React from 'react';
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loadingCurrentBook } from '../../redux/actions/bookAction';
import * as URL from '../../services/api/config';
const BookItem = (props) =>{
    const router = useRouter();
    const dispatch = useDispatch();
    // console.log("props.bookInfo", props.bookInfo);
    return(
        <div className="book-item-wrapper relative w-[240px] 
            h-[380px] shadow-[0px_2px_2px_2px_rgba(0,0,0,0.25)]
            mb-[18px] rounded-[8px] font-primary hover:cursor-pointer hover:opacity-80
            "
            onClick={() => {
                router.push('/bookpage/' + props.bookInfo.slug); 
                const getConcreteProduct = async() => {
                    await axios.get(URL.URL_PRODUCT + '/' + props.bookInfo.slug)
                        .then((data)=>{
                            // console.log("data get", data.data.product[0])
                            dispatch(loadingCurrentBook(data.data.product[0]))
                        })
                        .catch((error)=>{
                            // navigate to login
                            router.push('/')
                            console.log(error)
                        })
                }
                getConcreteProduct();
            }}    
        >
            <img 
                src={props.bookInfo.imgList[0]} 
                alt={props.bookInfo.title}
                className='w-[100%] h-[380px] rounded-[8px]'
            />
            <div className='book-detail absolute w-[240px] h-[140px] bg-white right-[0px] bottom-0 rounded-b-[8px]'>
                <div className="publish-place text-[#555555] text-[18px] text-center pt-[8px]">
                    {props.bookInfo.publisher}
                </div>
                <p className='book-title text-[22px] text-center leading-[24px] pt-[4px] px-[8px] font-[600] text-[#2BBCBA]'>
                    {props.bookInfo.title}
                </p>
                <p className='price text-[20px] font-[600] mt-[8px] text-center'>
                    {props.bookInfo.price}VNĐ
                </p>
            </div>
            {
                props.bookInfo.quantity > 0 ? null : 
                <div className='blank-banner absolute text-center w-[calc(100%+4px)] bg-white border-[2px] border-[#2BBCBA] top-[30%] left-[-2px]'>
                    <div className='banner-container w-[100%] h-[56px]  text-center'>
                        <p className='banner-title text-[#EA230F] font-extrabold text-[22px] leading-[56px]'>HẾT HÀNG</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default BookItem