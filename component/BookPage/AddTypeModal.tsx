import React, {useState, useRef} from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import * as URL from '../../services/api/config';
import axios from 'axios';
import { showAlertSuccess, showAlertError } from '../../redux/actions/alertAction';
import { useRouter } from 'next/router';
import { getCategory } from '../../redux/actions/categoryAction';

const AddTypeModal = (props) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [isValidation, setValidation] = useState(true);
    const [message, setMessage] = useState("");
    const productType = useSelector((state: RootStateOrAny)=> {return state.categoryReducer.categories} ) || [];
    const inputRef = useRef(null);
    // console.log("productType", productType);

    const addProductType = async() => {
        if(inputRef.current.value.length == 0){
            setValidation(false);
            setMessage("Tên của loại sách không được trống.");
            return;
        }
        for(let i = 0; i < productType.length; i++){
            if(productType[i].type == inputRef.current.value){
                setValidation(false);
                setMessage("Tên của loại sách đã tồn tại.");
                return;
            }
        }
        setValidation(true);
        setMessage("");

        const addData = {
            type: inputRef.current.value
        }

        let categoryList;
        await axios.post(URL.URL_CATEGORY, addData)
            .then((data)=>{
                categoryList = data.data;
                dispatch(getCategory(categoryList.categories));
                dispatch(showAlertSuccess("Thêm loại sản phẩm thành công!"));
            })
            .catch((error)=>{
                // navigate to login
                dispatch(showAlertError("Thêm loại sản phẩm không thành công!"));
                console.log(error)
            })
        
        props.clickConfirm();
        // console.log("addData", addData);

    }

    return (
        <div className="fixed top-[0px] left-0 right-0 bottom-0 z-[150] bg-[#00000040] flex">
            <div    
                className='not-modal w-[100%] h-[100%]'
                onClick={() => {
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
                    Thêm loại sách
                </div>
                <div className='divider w-[100%] h-[1px] bg-[#e5e5e5]'></div>
                <div className="flex">
                    <div
                        className='py-[20px] pl-[20px]'
                    >
                        Tên loại sách:
                    </div>
                    <input
                        className="border-[#999] border-[1px] ouline-none focus:outline-none 
                            px-[8px] py-[4px] h-[32px] mt-[17px] ml-[8px] rounded-[4px]
                        "
                        ref={inputRef}
                    ></input>
                </div>
                {
                    isValidation ? null :
                        <div className='validation ml-4 text-[13px] mt-[-8px] mb-[12px] text-[#f24725]'>
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
                            addProductType();
                        }}
                    >
                        Thêm
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default AddTypeModal;