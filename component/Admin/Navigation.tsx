import React from 'react';
import { Divider } from '@mui/material';
import { BsBox, BsReceipt, BsBarChartLine, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { AiOutlineDashboard } from 'react-icons/ai'
import { CgUserList } from 'react-icons/cg'
import { FiSettings } from 'react-icons/fi'
import style from '../../styles/Admin/Dashboard.module.css'
import Link from 'next/link';

function Navigation(props) {
    
    return (
        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='min:rounded-none 900px:rounded-lg relative min:h-full 900px:h-auto z-50'>
            <div className='text-xl font-bold mb-2'>SellingBook</div>
            <div className='text-base text-[#2C6ECB] cursor-pointer mb-2'>sellingbook.com</div>
            <Divider></Divider>
            <Link href={'/admin/dashboard'} passHref>
                <button className={props.option === 'dashboard' ? 'hover:opacity-80 cursor-pointer font-sans items-center mt-4 relative ' + style.active : 'hover:opacity-80 cursor-pointer font-sans items-center mt-4'} style={{ display: 'flex' }}>
                    <AiOutlineDashboard className='mr-4 text-2xl'></AiOutlineDashboard>
                    <span className='text-base'>Bảng điều khiển</span>
                </button>
            </Link>
            <Link href={'/admin/product'} passHref>
                <button className={props.option === 'product' ? 'hover:opacity-80 cursor-pointer font-sans items-center mt-4 relative ' + style.active : 'hover:opacity-80 cursor-pointer font-sans items-center mt-4'} style={{ display: 'flex' }}>
                    <BsBox className='mr-4 text-xl'></BsBox>
                    <span className='text-base'>Sản phẩm</span>
                </button>
            </Link>
            <Link href={'/admin/receipt'} passHref>
                <button className={props.option === 'receipt' ? 'hover:opacity-80 cursor-pointer font-sans items-center mt-4 relative ' + style.active : 'hover:opacity-80 cursor-pointer font-sans items-center mt-4'} style={{ display: 'flex' }}>
                    <BsReceipt className='mr-4 text-xl'></BsReceipt>
                    <span className='text-base'>Đơn hàng</span>
                </button>
            </Link>
            <Link href={'/admin/customer'} passHref>
                <button className={props.option === 'customer' ? 'hover:opacity-80 cursor-pointer font-sans items-center mt-4 relative ' + style.active : 'hover:opacity-80 cursor-pointer font-sans items-center mt-4'} style={{ display: 'flex' }}>
                    <CgUserList className='mr-4 text-xl'></CgUserList>
                    <span className='text-base'>Khách hàng</span>
                </button>
            </Link>
            <Link href={'/admin/statistic'} passHref>
                <button className={props.option === 'statistic' ? 'hover:opacity-80 cursor-pointer font-sans items-center mt-4 relative ' + style.active : 'hover:opacity-80 cursor-pointer font-sans items-center mt-4'} style={{ display: 'flex' }}>
                    <BsBarChartLine className='mr-4 text-xl'></BsBarChartLine>
                    <span className='text-base'>Thống kê</span>
                </button>
            </Link>
            <Link href={'/admin/setting'} passHref>
                <button className={props.option === 'setting' ? ' hover:opacity-80 cursor-pointer font-sans items-center mt-4 relative ' + style.active : 'hover:opacity-80 cursor-pointer font-sans items-center mt-4'} style={{ display: 'flex' }}>
                    <FiSettings className='mr-4 text-xl'></FiSettings>
                    <span className='text-base'>Cài đặt</span>
                </button>
            </Link>
            
        </div>
    );
}

export default Navigation;