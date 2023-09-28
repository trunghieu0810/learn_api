import React from 'react';

const ConfirmModal = (props) => {
    return (
        <div className="fixed top-[0px] left-0 right-0 bottom-0 z-[150] bg-[#00000040] flex">
            <div    
                className='not-modal w-[100%] h-[100%]'
                onClick={() => {
                    console.log("Notmodal");
                    props.clickCancel();
                }}
            >
            </div>
            <div 
                className='w-[60%] bg-[#fff] z-[160] absolute top-[15%] left-[20%]'
            >
                <div 
                    className='text-center text-[20px] py-[12px]'
                >
                    {props.title}
                </div>
                <div className='divider w-[100%] h-[1px] bg-[#e5e5e5]'></div>
                <div
                    className='py-[20px] pl-[20px]'
                >
                    {props.content}
                </div>
                <div className='divider w-[100%] h-[1px] bg-[#e5e5e5]'></div>

                <div className='flex items-end justify-end mr-[10px] py-2'>
                    <button
                        className={
                            "text-[16px] leading-[30px] bg-[#F24735] px-[20px] text-white rounded-[4px] " +
                            "hover:opacity-70 hover:cursor-pointer ml-2"
                        }
                        onClick={() => {
                            props.clickCancel();
                        }}
                    >
                        Huỷ
                    </button>
                    <button
                        className={
                            "text-[16px] leading-[30px] bg-[#2BBCBA] px-[20px] text-white rounded-[4px] " +
                            "hover:opacity-70 hover:cursor-pointer ml-2"
                        }
                        onClick={() => {
                            props.clickConfirm();
                        }}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default ConfirmModal;