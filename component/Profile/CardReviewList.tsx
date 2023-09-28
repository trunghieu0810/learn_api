import React, { useState } from 'react';
import style from '../../styles/Profile.module.css'
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'

function CardReviewList(props) {

    const [isOpen, setIsOpen] = useState(props.isOpen)

    const handleChangeOpen = () => {
        setIsOpen(oldState => !oldState)
    }





    return (
        <Card className='mb-4 px-4 py-4 border-solid border-2 border-[#0000005c] rounded-lg mr-6' style={{ overflow: 'inherit', position: 'relative' }} sx={{ display: 'flex' }}>
            <img className='rounded-lg border-[#2BBCBA] border-1 border-solid mr-3' height={127} width={100} src='https://upload.wikimedia.org/wikipedia/vi/6/61/Ng%E1%BB%93i_kh%C3%B3c_tr%C3%AAn_c%C3%A2y_cover.jpg'></img>
            <div className='w-full'>
                <div className='flex justify-between h-auto'>
                    <div className='flex justify-around w-full  items-center'>
                        <div className='font-medium text-lg'>Ngồi khóc trên cây</div>
                        <div className='flex items-center'>
                            <div className='text-xl mr-2'>4</div>
                            <Rating name="read-only" value={4} readOnly ></Rating>
                        </div>
                        <div className='text-base '>12/9/2022</div>
                    </div>
                </div>
                <div className={'border-[#333333] rounded-lg border-1 border-solid ml-4 text-justify mt-2 ' + style.hiddenLine}>
                    Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên
                    cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách
                    các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác
                    phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất
                    năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực
                </div>
            </div>
            <div onClick={handleChangeOpen} style={{ position: 'absolute', right: '-5%', top: '50%' }} className='cursor-pointer hover:opacity-80 border rounded-full border-solid border-1 border-black'>
                <BiDotsHorizontalRounded></BiDotsHorizontalRounded>
            </div>
            {
                isOpen ? (
                    <div className={'bg-white rounded-lg border-solid border-black border-1 p-2 ' + style.transitionModal} style={{ position: 'absolute', right: '-2%', top: '50%' }}>
                        <div className='flex items-center cursor-pointer hover:opacity-90'>
                            <AiOutlineEdit className='mr-2'></AiOutlineEdit>
                            <div style={{ width: '80px' }}>Chỉnh sửa</div>
                        </div>
                        <div className='flex items-center cursor-pointer hover:opacity-90'>
                            <RiDeleteBin5Line className='mr-2'></RiDeleteBin5Line>
                            <div style={{ width: '80px' }}>Xóa</div>
                        </div>
                    </div>
                ) : null
            }
        </Card>
    );
}

export default CardReviewList;