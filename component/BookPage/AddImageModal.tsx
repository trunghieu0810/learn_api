import React, {useState, useRef} from 'react';
import { useDispatch} from 'react-redux';
import { showAlertSuccess, showAlertError } from '../../redux/actions/alertAction';

const AddImageModal = (props) => {
    const dispatch = useDispatch();
    
    const inputRef = useRef(null);
    const imgDisplayRef = useRef(null);
    const [isValidation, setValidation] = useState(true);
    const [message, setMessage] = useState("");
    const addImage = async() => {
        if(!isValidation){
            dispatch(showAlertError("Hình ảnh không hợp lệ"))
            return;
        }
        props.clickConfirm(imgDisplayRef.current.src);
    }
    
    return (
        <div className="fixed top-[0px] left-0 right-0 bottom-0 z-[150] bg-[#00000040] flex">
            <div    
                className='not-modal w-[100%] h-[100%]'
                onClick={() => {
                    setValidation(true);
                    props.clickCancel();
                }}
            >
            </div>
            <div 
                className='w-[600px] bg-[#fff] z-[160] absolute top-[15%] left-[calc(50%-300px)]'
            >
                <div 
                    className='text-center text-[20px] py-[12px]'
                >
                    Hình ảnh
                </div>
                <div className='divider w-[100%] h-[1px] bg-[#e5e5e5]'></div>
                <div className="flex">
                    <div
                        className='py-[20px] pl-[20px]'
                    >
                        Link hình ảnh:
                    </div>
                    <input
                        className="border-[#999] border-[1px] ouline-none focus:outline-none 
                            px-[8px] py-[4px] h-[32px] mt-[17px] ml-[8px] rounded-[4px] 
                            flex-1 mr-6
                        "
                        ref={inputRef}
                        onChange={(e) => {
                            imgDisplayRef.current.src = inputRef.current.value;
                            setValidation(true);
                        }}
                    ></input>
                </div>
                <img src=""
                    className='w-[calc(100%-32px)] ml-[16px] max-h-[300px] object-contain
                        border-dashed border-[1px] min-h-[150px]
                    '
                    onError={() => {
                        setValidation(false);
                        setMessage("Hình ảnh không hợp lệ");
                    }}
                    ref={imgDisplayRef}
                />
                {
                    isValidation ? null :
                        <div className='validation ml-4 text-[13px] mt-[2px] mb-[12px] text-[#f24725]'>
                            *{message}
                        </div>
                }
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
                            addImage();
                        }}
                    >
                        Thêm
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default AddImageModal;