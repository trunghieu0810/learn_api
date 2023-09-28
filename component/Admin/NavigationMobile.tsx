import React, { useState } from 'react';
import {BiDotsVerticalRounded} from 'react-icons/bi'
import dynamic from 'next/dynamic';

const Navigation = dynamic(() => import('./Navigation'))

function NavigationMobile(props) {
    const [open, isOpen] = useState(false)

    return (
        <div className='min:block 900px:hidden'>
            <div className='900px:hidden top-1/2 left-0 sm:block fixed hover:cursor-pointer' onClick={() => { isOpen(true) }}>
                <BiDotsVerticalRounded></BiDotsVerticalRounded>
            </div>
            {
                open ? (
                    <div onClick={(e) => { isOpen(false) }} style={{zIndex: '100'}} className='fixed bg-[#0000006e] top-0 left-0 right-0 bottom-0 '>
                        <div onClick={(e) => { e.stopPropagation() }} className='bg-white left-0 h-full w-[300px] relative'>
                            {/* <div onClick={() => { isOpen(false) }} className='absolute -right-3 top-1/2 text-2xl z-50'>
                                <BsFillArrowLeftCircleFill ></BsFillArrowLeftCircleFill>
                            </div> */}
                            <Navigation option={props.option}></Navigation>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

export default NavigationMobile;