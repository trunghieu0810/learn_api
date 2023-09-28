
import React, { useState, useEffect, useRef }from 'react'
import Layout from '../../../component/Layout'
import {Container, Grid, Autocomplete, TextField, tablePaginationClasses} from '@mui/material';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const NavigationMobile = dynamic(() => import('../../../component/Admin/NavigationMobile'))
const Navigation = dynamic(() => import('../../../component/Admin/Navigation'))
import {getCategory} from '../../../redux/actions/categoryAction'; 
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import * as URL from '../../../services/api/config'
import axios from 'axios';
import { FiDelete } from "react-icons/fi";
import { useRouter } from 'next/router'
const ConfirmModal = dynamic(() => import('../../../component/BookPage/ConfirmModal'));
import { showAlertSuccess, showAlertError } from '../../../redux/actions/alertAction'
import { loadingAllTags } from '../../../redux/actions/bookAction';
const AddTypeModal = dynamic(() => import('../../../component/BookPage/AddTypeModal'))
const AddImageModal = dynamic(() => import('../../../component/BookPage/AddImageModal'))


interface ProductTypeItem {
    _id: string,
    type: string,
}


const AddBook: React.FC = () => {  
    const dispatch = useDispatch();
    const router = useRouter(); 

    enum inputType {
        SINGLE_LINE,
        TEXT_AREA,
    }
    // Lấy tất cả product type
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
    }, [])

    // useSelector((state:RootStateOrAny) => {
    //     console.log("state", state.categoryReducer.categories);
    // })


    const productType = useSelector((state: RootStateOrAny)=> {return state.categoryReducer.categories} ) || [];

    const [selectedTypeID, setSelectedTypeID] = useState([]);
    const addSelectedTypeID = (e) => {
        var currentList = JSON.parse(JSON.stringify(selectedTypeID));
        currentList.push(e.target.value);
        setSelectedTypeID(currentList);
    }

    const removeSelectedTypeID = (removeID) => {
        var currentList = JSON.parse(JSON.stringify(selectedTypeID));
        currentList = currentList.filter(function(value, index, arr){ 
            return value != removeID;
        });
        setSelectedTypeID(currentList);
    }

    const currentKeyWord : string[] = ["Nguyễn Nhật Ánh", "Rùa"]

    const inputSection = (name: string, typeValue: inputType, hasDivider: boolean, 
        ref: React.RefObject<HTMLInputElement>, refTextArea: React.RefObject<HTMLTextAreaElement>) => {
        return ([
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}
                className='input-label relative'
            >
                <div className='title h-8 text-right leading-[22px] mr-4'>{name}</div>
                {
                    !hasDivider ? (null) :
                        <div className='divider
                                h-[400px] w-[1px] 
                                bg-[#C5C5C5]
                                absolute top-[6px] right-[0px]
                            '   
                        ></div>
                }
            </Grid>,
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}
                className=''
            >
                {
                    typeValue == inputType.SINGLE_LINE 
                        ?
                            <input type='text' 
                                className='product-name 
                                    w-[calc(100%)] h-[32px]
                                    rounded-[4px] border-[1px] border-[#999999]
                                    text-[#333] text-[18px]
                                    px-[8px]
                                    focus-visible:outline-none
                                    focus:outline-none
                                '
                                ref={ref}
                            >

                            </input>
                        : 
                    typeValue == inputType.TEXT_AREA
                        ? <textarea
                            className='product-detail
                                w-[calc(100%)] h-[100px]
                                rounded-[4px] border-[1px] border-[#999999]
                                text-[#333] text-[18px]
                                px-[8px]
                                focus-visible:outline-none
                                focus:outline-none
                                resize-none
                            '
                            ref={refTextArea}
                        >

                        </textarea>
                        : null
                } 
            </Grid> 
        ])
    }

    const uploadPicture = async(e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        formData.append("upload_preset", "phiroud");
        // const sleep = ms => new Promise(res => setTimeout(res, ms));
        // await sleep(1000);
        await axios.post( "https://api.cloudinary.com/v1_1/phiroud321/image/upload", formData)
            .then((data) => {
                console.log(data.data.url);
                var currentImgList = JSON.parse(JSON.stringify(imgList));
                currentImgList.push(data.data.url);
                setImgList(currentImgList);
            })
            .catch((error) => {
                // alert(error);
                dispatch(showAlertError('Không thể upload file'));
            })
        
        // dispatch(articleActions.uploadArticlePicture(formData));
    }

    const [imgList, setImgList] = useState([]);

    const removeImgInput = (imgItem, imgIndex) => {
        var currentImgList = JSON.parse(JSON.stringify(imgList));
        currentImgList = currentImgList.filter(function(value, index, arr){ 
            return value != imgItem || index != imgIndex;
        });
        setImgList(currentImgList);
    } 

    const pageRef = {
        title: useRef(null),
        introduction: useRef(null),
        author: useRef(null), 
        importPrice: useRef(null),
        sellPrice: useRef(null),
        importDate: useRef(null),
        quantity: useRef(null),
        totalValue: useRef(null),
        publisher: useRef(null),
        format: useRef(null),
        publishYear: useRef(null),
        detailInformation: useRef(null),
        pageAmount: useRef(null),
        size: useRef(null),
    }

    const addProduct = async() => {
        console.log("selectTagList", selectTagList);
        // convert
        let tagIDList = [];
        selectTagList.forEach(element => {
            tagIDList.push(element._id);
        });

        // console.log("tagIDList", tagIDList);
        // return;
        console.log("pageRef", pageRef)
        var addData = {
            author: pageRef.author.current.value,
            title: pageRef.title.current.value,
            introduction: pageRef.introduction.current.value,
            imgList: imgList,
            categoryID: selectedTypeID,
            // Phần thông tin nhập hàng
            importPrice: pageRef.importPrice.current.value,
            sellPrice: pageRef.sellPrice.current.value,
            importDate: pageRef.importDate.current.value,
            quantity: pageRef.quantity.current.value,
            //
            totalValue: pageRef.importPrice.current.value,
            publisher: pageRef.publisher.current.value,
            format: pageRef.format.current.value,
            publishYear: pageRef.publishYear.current.value,
            detailInformation: pageRef.detailInformation.current.value,
            pageAmount: pageRef.pageAmount.current.value,
            size: pageRef.size.current.value,
            tagIDList: tagIDList
        }
        // Check điều kiện thêm sản phẩm
        if(addData.author.length==0){
            dispatch(showAlertError('Tên tác giả không được để trống'));
            return false;
        }
        else if(addData.title.length==0) {
            dispatch(showAlertError('Tên sách không được để trống'));
            return false;
        }
        else if(addData.introduction.length==0) {
            dispatch(showAlertError('Miêu tả sách không được để trống'));
            return false;
        }
        else if(addData.imgList.length==0) {
            dispatch(showAlertError('Hình ảnh sách không được để trống'));
            return false;
        }
        else if(addData.importPrice.length==0) {
            dispatch(showAlertError('Giá nhập sách không được để trống'));
            return false;
        }
        else if(parseInt(addData.importPrice)<=0) {
            dispatch(showAlertError('Giá nhập sách phải lớn hơn 0'));
            return false;
        }
        else if(addData.sellPrice.length==0) {
            dispatch(showAlertError('Giá bán sách không được để trống'));
            return false;
        }
        else if(parseInt(addData.sellPrice)<=0) {
            dispatch(showAlertError('Giá bán sách phải lớn hơn 0'));
            return false;
        }
        else if(addData.importDate.length==0) {
            dispatch(showAlertError('Ngày nhập sách không được để trống'));
            return false;
        }
        else if(addData.quantity.length==0) {
            dispatch(showAlertError('Số lượng sách không được để trống'));
            return false;
        }
        else if(addData.publisher.length==0) {
            dispatch(showAlertError('Nhà xuất bản sách không được để trống'));
            return false;
        }
        else if(addData.format.length==0) {
            dispatch(showAlertError('Loại bìa sách không được để trống'));
            return false;
        }
        else if(addData.publishYear.length==0) {
            dispatch(showAlertError('Năm xuất bản sách không được để trống'));
            return false;
        }
        else if(addData.detailInformation.length==0) {
            dispatch(showAlertError('Chi tiết mô tả sách không được để trống'));
            return false;
        }
        else if(addData.pageAmount.length==0) {
            dispatch(showAlertError('Số trang sách không được để trống'));
            return false;
        }
        else if(addData.size.length==0) {
            dispatch(showAlertError('Kích thước sách không được để trống'));
            return false;
        }
        console.log("add Data", addData)
        await axios.post( URL.URL_PRODUCT, addData)
            .then((data) => {
                console.log("add data post", data);
                // alert("Thêm sản phẩm thành công");
                dispatch(showAlertSuccess("Thêm sách thành công"));
                // console.log(router);
                router.push('/admin/product/');
                return true;
            })
            .catch((error) => {
                alert(error);
            })
    }

    const calculateAmount = () => {
        if(pageRef.importPrice.current.value=="" || pageRef.quantity.current.value==""){
            pageRef.totalValue.current.value="";
        }
        else {
            pageRef.totalValue.current.value=pageRef.importPrice.current.value*pageRef.quantity.current.value;
        }
    }

    const [isShowModal, setIsShowModal] = useState(false);

    const cancelClick =  () => {
        setIsShowModal(false);
        return;
    }

    const backClick = () => {
        router.push('/admin/product');
        setIsShowModal(false);
        return;
    }

    const addProductClick = async() => {
        setIsShowModal(false);
        let result = await addProduct();
        if(result == true){
            router.push('/admin/product');
        }
        return;
    }

    let [currentClickButton, setCurrentClickButton] = useState("");

    let confirmFunction = () => {
        if(currentClickButton == "cancel"){
            backClick();
        }
        // else if(currentClickButton == 'add'){
        //     addProductClick();
        // }
        else addProduct();
    }
    
    let [content, setContent] = useState("");

    // Modal thêm sách
    const [isShowAddTypeModal, setIsShowAddTypeModal] = useState(false);
    
    // Modal thêm hình ảnh
    const [isShowAddImageModal, setIsShowAddImageModal] = useState(false);
    

    // Từ khoá
    const convertAutoComplete = (tags) => {
        let res = [];
        tags.forEach(tag => {
            for(let i = 0; i < selectTagList.length; i++){
                if(selectTagList[i]._id == tag._id){
                    return;
                }
            } 
            res.push({
                label: tag.tag,
                _id: tag._id,
            })
        });
        return res;
    }
    const tags = useSelector((state: RootStateOrAny)=> {return state.bookReducer.tags} ) || [];
    useEffect(() => {
        const getAllTag = async() => {
            // var categoryList;
            await axios.get(URL.URL_TAG)
                .then((data)=>{
                    console.log("data.data", data.data)
                    // categoryList = data.data;
                    dispatch(loadingAllTags(data.data.tags));
                })
                .catch((error)=>{
                    // navigate to login
                    router.push('/')
                    dispatch(showAlertError("Không thể lấy dự liệu từ khoá của sách"));
                    // console.log(error)
                })
            // dispatch(getCategory(categoryList.categories));
            
        }
        getAllTag();
    }, [])

    console.log('tags', tags);
    // Add new tag
    const tagRef = useRef(null);
    let currentTag = "";

    const checkValidationAddTag = (inputTag) =>{
        if(inputTag.length==0){
            dispatch(showAlertError("Tag không thể để trống hoặc đang chọn tag có sẵn"));
            return false;
        }
        tags.forEach(tag => {
            if(tag.tag == inputTag){
                dispatch(showAlertError("Tag bị trùng tên"));
                return false;
            }
        });
        return true;
    }

    const addNewTag = async() => {
        // console.log(currentTag)
        console.log("Vô được đây rồ")
        const dataToAdd = {
            tag: currentTag
        }
        console.log(tagRef);
        (document.querySelector('#combo-box-demo') as HTMLInputElement).value = '';
        await axios.post(URL.URL_TAG, dataToAdd)
            .then((data)=>{
                console.log("data.data", data.data)
                // categoryList = data.data;
                dispatch(loadingAllTags(data.data.tags));
                dispatch(showAlertSuccess("Thêm tag mới thành công"));
                
            })
            .catch((error)=>{
                // navigate to login
                router.push('/')
                // dispatch(showAlertError("Không thể lấy dự liệu từ khoá của sách"));
                // console.log(error)
            })
        // console.log("co", tagRef.current.inputValue)
        
    }

    interface ISlectVal {
        label: String,
        _id: String
    }

    const [autoSelectValue, setAutoSelectValue] = useState([]);
    const onSelectChange = (e, value) => {
        setAutoSelectValue(value);
    };

    const [selectTagList, setSelectTagList] = useState([]);
    const addToSelectTag = () => {
        var currentSelectTagList = selectTagList;
        // console.log(autoSelectValue);
        currentSelectTagList.push(autoSelectValue);
        setSelectTagList(currentSelectTagList);
    }

    const removeSelectedTag = (removeIndex) => {
        var currentSelectTagList = selectTagList;
        currentSelectTagList = currentSelectTagList.filter((value, index) => {
            return index!=removeIndex;
        })
        // currentSelectTagListID.push(autoSelectValue._id);
        setSelectTagList(currentSelectTagList);
    }

    return (
        <Layout activeNav={"book"} className='relative'>
            <Head>
                <title>Thêm sản phẩm</title>
            </Head>
            {
                isShowModal ?
                <ConfirmModal        
                    title="Xác nhận" 
                    clickConfirm={() => confirmFunction()}
                    clickCancel={() => cancelClick()}
                    content={content}
                />
                : null
            }
            
            {
                isShowAddTypeModal ?
                <AddTypeModal
                    clickCancel={() => {
                        setIsShowAddTypeModal(false);
                    }}
                    clickConfirm={() => {
                        setIsShowAddTypeModal(false);
                    }}
                /> : null
            }

            {
                isShowAddImageModal ?
                <AddImageModal
                    clickCancel={() => {
                        setIsShowAddImageModal(false);
                    }}
                    clickConfirm={(imgLink) => {
                        var currentImgList = JSON.parse(JSON.stringify(imgList));
                        currentImgList.push(imgLink);
                        setImgList(currentImgList);
                        setIsShowAddImageModal(false);
                    }}
                /> : null
            }
            <Container className='relative' maxWidth='lg'>
                
                <NavigationMobile option='product'></NavigationMobile>
                <Grid className='mb-16' container spacing={3}>
                    <Grid className='mt-16 min:hidden 900px:block' item md={3}>
                        <Navigation option='product'></Navigation>
                    </Grid>
                    <Grid className='mt-16 font-primary font-[500] text-[#000]' sm={12} item md={9}>
                        <div className='title text-[#2BBCBA] text-[24px]'>
                            Thêm sản phẩm
                        </div>
                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg'>
                            <div className='title 
                                text-[22px] font-[600] text-[#000]
                            '>
                                Thông tin sản phẩm
                            </div>
                            <Grid container spacing={1} className='mt-2'>
                                {inputSection("Tên sản phẩm", inputType.SINGLE_LINE, true, pageRef.title, null)} 
                                {inputSection("Mô tả", inputType.TEXT_AREA, false, null ,pageRef.introduction)} 
                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}
                                    className='input-label relative'
                                >
                                    <div className='title h-8 text-right leading-[22px] mr-4'>Hình ảnh</div>
                                </Grid>
                                
                                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}
                                    className=''
                                >
                                    <div
                                        className='product-image-border
                                        w-[calc(100%)] h-[200px]
                                        rounded-[4px] border-[1px] border-[#999999] border-dashed

                                    '>
                                        {
                                            imgList.length == 0 ?
                                                <div 
                                                    className={
                                                        "product-img-detail flex flex-column items-center justify-center " +
                                                        "w-[100%] h-[100%]"
                                                    }
                                                >
                                                    <div className='add-detail flex justify-center'>
                                                        <input
                                                            className='post-image-add-hidden hidden'
                                                            type='file'
                                                            id='post-image-input'
                                                            onChange={ async(e) => {
                                                                let tgt = e.target || window.event.srcElement;
                                                                let files = (e.target as HTMLInputElement).files;
                                                                console.log("files", files);
                                                                // FileReader support
                                                                if (FileReader && files && files.length) {
                                                                    var fr = new FileReader();
                                                                    const sleep = ms => new Promise(res => setTimeout(res, ms));
                                                                    fr.onload = async() => {
                                                                        // document.querySelector('.product-current-upload-img').src = fr.result;
                                                                        // console.log("fr.result", fr.result);
                                                                        // addTempImage(fr.result);
                                                                        // await sleep(2000);
                                                                        // setTempImage([]);
                                                                    }
                                                                    fr.readAsDataURL(files[0]);
                                                                    uploadPicture(e);
                                                                }
                                                            }}
                                                        />
                                                        <label
                                                            className={
                                                                'add-from-link text-[16px] bg-[#E5EFFD] text-[#103262] ' +
                                                                'font-[600] px-2 py-1 hover:opacity-70 hover:cursor-pointer'
                                                            }
                                                            htmlFor="post-image-input"
                                                            onClick={() => {
                                                                
                                                            }}
                                                        >
                                                            Thêm hình ảnh
                                                        </label>
                                                        <div 
                                                            className={
                                                                'add-from-link text-[16px] text-[#103262] ' + 
                                                                'font-[600] px-2 py-1 underline ml-2 ' +
                                                                'hover:opacity-80 hover:cursor-pointer hover:text-[#2bbcba]'
                                                            }
                                                            onClick={() => {
                                                                setIsShowAddImageModal(true);
                                                            }}
                                                        >
                                                            Thêm từ link
                                                        </div>
                                                    </div>
                                                    <div className='add-description text-[14px]'>
                                                        Chấp nhận hình ảnh từ thiết bị hoặc link
                                                    </div>
                                                </div>
                                            :   
                                            <div className='flex'>
                                                {
                                                    imgList.map((value,index) => {
                                                        return (
                                                            <div
                                                                className='h-[180px] w-[180px] border-dashed border-[1px] border-[#999] mx-[10px] my-[10px] relative'   
                                                            >
                                                                <img 
                                                                    className='h-[180px] w-[180px] object-contain'
                                                                    src={value} 
                                                                    alt="" 
                                                                />
                                                                <FiDelete
                                                                    className="absolute top-0 right-1 text-[#999] hover:cursor-pointer hover:text-[#2BBCBA]"
                                                                    size={24}
                                                                    onClick = {(e)=> {
                                                                        removeImgInput(value, index);
                                                                    }}
                                                                />
                                                            </div>
                                                        )
                                                        
                                                    }) 
                                                }
                                                <div className='add-detail w-[180px] h-[180px] 
                                                    border-dashed border-[1px] border-[#999] my-[10px]  text-center'
                                                >
                                                    <input
                                                        className='post-image-add-hidden hidden'
                                                        type='file'
                                                        id='post-image-input-1'
                                                        onChange={ async(e) => {
                                                            let tgt = e.target || window.event.srcElement;
                                                            let files = (e.target as HTMLInputElement).files;
                                                            console.log("files", files);
                                                            // FileReader support
                                                            if (FileReader && files && files.length) {
                                                                var fr = new FileReader();
                                                                const sleep = ms => new Promise(res => setTimeout(res, ms));
                                                                fr.onload = async() => {
                                                                    // document.querySelector('.product-current-upload-img').src = fr.result;
                                                                    // console.log("fr.result", fr.result);
                                                                    // addTempImage(fr.result);
                                                                    // await sleep(2000);
                                                                    // setTempImage([]);
                                                                }
                                                                fr.readAsDataURL(files[0]);
                                                                uploadPicture(e);
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        className={
                                                            'add-from-link text-[16px] bg-[#E5EFFD] text-[#103262] ' +
                                                            'font-[600] px-2 py-1 hover:opacity-70 hover:cursor-pointer mt-[46px] '
                                                        }
                                                        htmlFor="post-image-input-1"
                                                        onClick={() => {

                                                        }}
                                                    >
                                                        Thêm hình ảnh
                                                    </label>
                                                    <div 
                                                        className={
                                                            'add-from-link text-[16px] text-[#103262] ' + 
                                                            'font-[600] underline text-center mt-2 ' + 
                                                            'hover:opacity-80 hover:cursor-pointer hover:text-[#2bbcba]'
                                                        }
                                                        onClick={() => {
                                                            setIsShowAddImageModal(true);
                                                        }}
                                                    >
                                                        Thêm từ link
                                                    </div>
                                                </div>
                                            </div>

                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}
                                    className='input-label relative mt-[11px]'
                                >
                                    <div className='title h-8 text-right leading-[22px] mr-4'>Loại sản phẩm</div>
                                </Grid>
                                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}
                                    className='mt-2 flex'
                                >
                                    <select name="product-type" id="product-type"
                                        className={
                                            "border-[1px] !border-[#e5e5e5] py-[4px] focus:border-[#e5e5e5]  focus-visible:border-[#e5e5e5] "
                                        }
                                        onChange={(e) => {
                                            addSelectedTypeID(e)
                                        }}
                                    >
                                        <option
                                            value={0}
                                            className="py-1"
                                        >
                                            Chọn các loại
                                        </option>
                                        {
                                            productType.map((item, value, key)=>{
                                                if(!selectedTypeID.includes(item._id))
                                                return (
                                                    <option
                                                        value={item._id}
                                                        className="py-1"
                                                    >
                                                        {item.type}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                    <button
                                        className={
                                            "buy-button text-[16px] leading-[30px] bg-[#2BBCBA] px-[20px] text-white rounded-[4px] " +
                                            "hover:opacity-70 hover:cursor-pointer ml-2"
                                        }
                                        onClick={() => {
                                            setIsShowAddTypeModal(true);
                                        }}
                                    >
                                        Thêm 
                                    </button>
                                    <div 
                                        className={
                                            "display-type-selected " + 
                                            "flex ml-[24px]"
                                        }
                                    >

                                        {
                                            productType.map((item, value, key)=>{
                                                console.log("selectedTypeID",selectedTypeID)
                                                if(selectedTypeID.includes(item._id))
                                                    return (
                                                        <div
                                                            className={"relative hover:opacity-80"}
                                                        >
                                                            <div 
                                                                className={
                                                                    "py-[4px] px-[8px] ml-[16px] "+
                                                                    "bg-[#7E97B9] text-[#fff] rounded-[4px] leading-[25px] cursor-pointer "
                                                                }
                                                            >
                                                                {item.type}
                                                            </div>
                                                            <div
                                                                className={
                                                                    "rounded-[100%] bg-[#F16F61] w-4 h-4 text-[#fff] " + 
                                                                    "absolute top-[-4px] right-[-6px] "+ 
                                                                    'hover:opacity-50 hover:cursor-pointer group-hover:opacity-70 ' +
                                                                    item._id+"-hover:opacity-70"
                                                                }
                                                            >
                                                                <p
                                                                    className={
                                                                        'close-icon mt-[-4px] ml-[4px] ' 
                                                                    }
                                                                    onClick={() => {
                                                                        removeSelectedTypeID(item._id)
                                                                    }}
                                                                >
                                                                    x
                                                                </p>
                                                            </div>
                                                        </div>
                                                        
                                                    );
                                            })
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg  mt-[40px]'>
                            <div className='title 
                                text-[22px] font-[600] text-[#000]
                            '>
                                Thông tin nhập sản phẩm
                            </div>
                            <Grid container spacing={1} className='mt-2'>
                                <Grid item sm={12} md={6} lg={6}>
                                    <div className='flex relative'>
                                        <div
                                            className='w-[120px] text-right pr-[12px] leading-[25px]'
                                        >
                                            Giá nhập
                                        </div>
                                        <div>
                                            <input 
                                                type="number" 
                                                className="border-[1px] border-[#999] focus-visible:outline-none
                                                focus:outline-none py-1 px-1 rounded-2"
                                                ref={pageRef.importPrice}
                                                onChange={() => {
                                                    calculateAmount();
                                                }}
                                                onWheel={(e) => {
                                                    (e.target as HTMLElement).blur();
                                                    return false;
                                                }}
                                            >

                                            </input>
                                        </div>
                                        <div 
                                            className="divider w-[1px] h-[80px] bg-[#e5e5e5] left-[112px] absolute"
                                        ></div>
                                    </div>
                                    <div className='flex mt-[12px]'>
                                        <div
                                            className='w-[120px] text-right pr-[12px] leading-[25px]'
                                        >
                                            Giá bán
                                        </div>
                                        <div>
                                            <input 
                                                type="number" 
                                                className="border-[1px] border-[#999] focus-visible:outline-none
                                                focus:outline-none py-1 px-1 rounded-2"
                                                ref={pageRef.sellPrice}
                                                onWheel={(e) => {
                                                    (e.target as HTMLElement).blur();
                                                    return false;
                                                }}
                                            >

                                            </input>
                                        </div>
                                        
                                    </div>
                                    
                                </Grid>
                                <Grid item sm={12} md={6} lg={6}>
                                    <div className='flex relative'>
                                        <div
                                            className='w-[120px] text-right pr-[12px] leading-[25px]'
                                        >
                                            Ngày nhập
                                        </div>
                                        <div>
                                            <input 
                                                type="date"
                                                className="border-[1px] border-[#999] focus-visible:outline-none
                                                    focus:outline-none py-1 px-1 rounded-2
                                                    w-[100%]
                                                "
                                                ref={pageRef.importDate}
                                            >

                                            </input>
                                        </div>
                                        <div 
                                            className="divider w-[1px] h-[80px] bg-[#e5e5e5] left-[112px] absolute"
                                        ></div>
                                    </div>
                                    <div className='flex mt-[12px]'>
                                        <div
                                            className='w-[120px] text-right pr-[12px] leading-[25px]'
                                        >
                                            Số lượng
                                        </div>
                                        <div>
                                            <input 
                                                type="number" 
                                                className="border-[1px] border-[#999] focus-visible:outline-none
                                                focus:outline-none py-1 px-1 rounded-2"
                                                ref={pageRef.quantity}
                                                onChange={() => {
                                                    calculateAmount();
                                                }}
                                            >

                                            </input>
                                        </div>
                                        <div className="divider"></div>
                                    </div>
                                    
                                </Grid>
                                <Grid item sm={12} md={12} lg={12}
                                    className="mt-[2px]"
                                >
                                    <div className='divider w-[100%] h-[1px] bg-[#e5e5e5] '>

                                    </div>
                                    <div className='flex mt-[12px]'>
                                        <div
                                            className='w-[120px] text-right pr-[12px] leading-[25px]'
                                        >
                                            Tổng tiền
                                        </div>
                                        <div>
                                            <div>
                                                <input 
                                                    type="number" 
                                                    className="border-[1px] border-[#999] focus-visible:outline-none
                                                    focus:outline-none py-1 px-1 rounded-2"
                                                    ref={pageRef.totalValue}
                                                    readOnly={true}
                                                >

                                                </input>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                    </div>
                                </Grid>
                                
                            </Grid>
                        </div>

                        <div style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '25px' }} className='rounded-lg  mt-[40px]'>
                            <div className='title 
                                text-[22px] font-[600] text-[#000]
                            '>
                                Chi tiết sản phẩm
                            </div>
                            <Grid container spacing={1} className='mt-2'>
                                {inputSection("Tác giả", inputType.SINGLE_LINE, true, pageRef.author, null)}
                                {inputSection("Nhà xuất bản", inputType.SINGLE_LINE, false, pageRef.publisher, null)}
                                {inputSection("Dạng bìa", inputType.SINGLE_LINE, false, pageRef.format, null)}
                                {inputSection("Năm phát hành", inputType.SINGLE_LINE, false, pageRef.publishYear, null)}
                                {inputSection("Chi tiết mô tả", inputType.TEXT_AREA, false, null, pageRef.detailInformation)}
                                {inputSection("Số trang", inputType.SINGLE_LINE, false, pageRef.pageAmount, null)}
                                {inputSection("Kích thước", inputType.SINGLE_LINE, false, pageRef.size, null)} 
                                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}
                                    className='input-label relative mt-[11px]'
                                >
                                    <div className='title h-8 text-right leading-[22px] mr-4'>Từ khoá</div>
                                </Grid>
                                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}
                                    className='flex flex-wrap'
                                >
                                    <Autocomplete
                                        // disablePortal
                                        ref={tagRef}
                                        id="combo-box-demo"
                                        options={convertAutoComplete(tags)}
                                        sx={{ width: 200, height: 35 }}
                                        renderInput={(params) => <TextField {...params}/>}
                                        className='mt-2'
                                        onInputChange={(e,val)=> {
                                            currentTag = val;
                                        }}
                                        disableClearable
                                        onChange={(e, val) => {
                                            onSelectChange(e, val);
                                        }}
                                        value={autoSelectValue}
                                        // inputValue={autoValue}
                                        clearOnBlur={false}
                                    />
                                    <button
                                        className={
                                            "buy-button text-[16px] leading-[30px] bg-[#5ed44b] px-[20px] text-white rounded-[4px] " +
                                            "hover:opacity-70 hover:cursor-pointer ml-2 h-[35px] mt-2"
                                        }
                                        onClick={() => {
                                            if(checkValidationAddTag(currentTag))
                                                addNewTag();
                                        }}
                                    >
                                        Thêm tag
                                    </button>
                                    <button
                                        className={
                                            "buy-button text-[16px] leading-[30px] bg-[#2BBCBA] px-[20px] text-white rounded-[4px] " +
                                            "hover:opacity-70 hover:cursor-pointer ml-2 h-[35px] mt-2 mr-6"
                                        }
                                        onClick={() => {
                                            // addNewTag();
                                            // console.log("autoSelectValue", autoSelectValue)
                                            if(autoSelectValue.length==0) return;
                                            addToSelectTag();  
                                            setAutoSelectValue([]);
                                        }}
                                    >
                                        Chọn
                                    </button>
                                    <div 
                                        className={
                                            "display-type-selected " + 
                                            "flex mt-2"
                                        }
                                    >
                                        {
                                            selectTagList.map((item, index)=>{
                                                return (
                                                    <div
                                                        className="relative"
                                                    >
                                                        <div 
                                                            className={
                                                                "py-[4px] px-[8px] mr-[16px] "+
                                                                "bg-[#7E97B9] text-[#fff] rounded-[4px] leading-[25px] "
                                                            }
                                                        >
                                                            {
                                                                tags.map((value, index) => {
                                                                    if(value._id == item._id) 
                                                                    return value.tag;
                                                                })
                                                            }
                                                        </div>
                                                        <div
                                                            className={
                                                                "rounded-[100%] bg-[#F16F61] w-4 h-4 text-[#fff] " + 
                                                                "absolute top-[-4px] right-[10px]"
                                                            }
                                                        >
                                                            <p
                                                                className='close-icon mt-[-4px] ml-[4px] hover:cursor-pointer hover:opacity-70'
                                                                onClick={() => {
                                                                    removeSelectedTag(index);
                                                                }}
                                                            >
                                                                x
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                );
                                            })
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        <div className="product-manage-contain flex justify-between mt-[18px]">
                            <div className='left'>
                                <button
                                    className={
                                        "buy-button text-[16px] leading-[30px] bg-[#F24735] px-[20px] text-white rounded-[4px] " +
                                        "hover:opacity-70 hover:cursor-pointer uppercase py-[6px]"
                                    }
                                    onClick={() => {
                                        setCurrentClickButton('cancel');
                                        setContent("Bạn có muốn huỷ bỏ việc nhập liệu thêm sản phẩm?");
                                        setIsShowModal(true);
                                    }}
                                >
                                    Huỷ
                                </button>
                            </div>
                            
                            <div className='right'>
                                <button
                                    className={
                                        "buy-button text-[16px] leading-[30px] bg-[#999] px-[20px] text-white rounded-[4px] " +
                                        "hover:opacity-70 hover:cursor-pointer ml-2 uppercase py-[6px]"
                                    }
                                    onClick={() => {
                                        
                                    }}
                                >
                                    Xem trước
                                </button>
                                <button
                                    className={
                                        "buy-button text-[16px] leading-[30px] bg-[#2BBCBA] px-[20px] text-white rounded-[4px] " +
                                        "hover:opacity-70 hover:cursor-pointer ml-2 uppercase py-[6px]"
                                    }
                                    onClick={() => {
                                        // setCurrentClickButton('add');
                                        // setContent("Bạn có chắc chắc muốn thêm sản phẩm?");
                                        // setIsShowModal(true);
                                        addProduct();
                                    }}
                                >
                                    Thêm hàng
                                </button>
                            </div>  
                        </div>
                        
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}


export default AddBook