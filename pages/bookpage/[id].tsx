
import React, { useState, useEffect }from 'react'
import Layout from '../../component/Layout'
import {Grid} from '@mui/material';
import BookItem from '../../component/BookPage/BookItem';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ProgressBar from "@ramonak/react-progress-bar";
import Pagination from '@mui/material/Pagination';
import { makeStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import * as URL from '../../services/api/config';
import axios from 'axios';
import { useRouter } from 'next/router'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux' 
import { loadingCurrentBook, loadingBook } from '../../redux/actions/bookAction';
import { loadingCart } from '../../redux/actions/cartAction';
import { showAlertSuccess, showAlertError } from '../../redux/actions/alertAction';
import Head from 'next/head';

const ArrowLeft = (props) => (
    <button
        {...props}
        className='prev w-[60px] h-[60px] bg-white rounded-[100%] border-[1px] border-[#2BBCBA] 
        absolute z-10 left-[-30px] top-[30%]'
    >
        <MdArrowBackIosNew size={26} className='ml-[15px] text-[#2BBCBA]'/>
    </button>   
);

const ArrowRight = (props) => (
    <button
        {...props}
        className='next w-[60px] h-[60px] bg-white rounded-[100%] border-[1px] border-[#2BBCBA] 
        absolute z-10 right-[-30px] top-[30%]'
    >
        <MdArrowForwardIos size={26} className='ml-[17px] text-[#2BBCBA]'/>
    </button>
);

const imgUrl = [
    "https://i.pinimg.com/564x/a0/87/cd/a087cd3d2bde65f23369350e92292bce.jpg",
    "https://i.pinimg.com/564x/1f/f9/77/1ff977bac4d2551597872828c0af31e7.jpg"
]

const BookPage: React.FC = () => {  
    const [width, setDimensions] = React.useState(1200);
    const router = useRouter();
    const dispatch = useDispatch();
    React.useEffect(() => {
        function handleResize() {
            setDimensions(typeof window !== undefined ? window.innerWidth: 800)
            settings.slidesToShow = width / 340; 
        }
        if(typeof window != undefined)
            window.addEventListener('resize', handleResize)
    })
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: width / 350,
        slidesToScroll: 1,
        nextArrow: <ArrowRight/>,
        prevArrow: <ArrowLeft/>
    };

    const data = [ 10,10,199,89,1443];

    const ratingConcreteRender = (data) => {
        var sum = 0;
        data.forEach(a => {
            if(typeof a == 'number')
                sum += a;
        });
        console.log("sum", sum)
        var totalScore = 0;
        data.forEach((a, index) => {
            if(typeof a == 'number')
                totalScore += a *  (index+1);
        });


        return (
            <div 
                className='rating-container 
                    mr-[12px] 
                '
            >
                <div className='rating-overall'>
                    <div className='
                        rating-heading
                        flex
                    '>
                        <div 
                            className='rating-score
                                font-primary font-[600]
                                text-[36px]
                                leading-[54px]
                            '
                        >
                            {Math.floor(totalScore*10/sum)/10}
                        </div>
                        <div className='
                            rating-comment-overall
                            flex flex-col
                            mt-[7px] ml-[4px]
                        '> 
                            <div 
                                className='rating-detail
                                    flex'
                            >
                                {
                                    Array.from(Array(Math.floor(totalScore/sum)).keys()).map(()=>{
                                        return(<AiFillStar color={'FFD25E'} size={20}/>)
                                    })
                                }
                                {
                                    Array.from(Array(5 - Math.floor( totalScore/sum)).keys()).map(()=>{
                                        return(<AiOutlineStar color={'FFD25E'} size={20}/>)
                                    })
                                }
                            </div>
                            <div className='
                                comment-count 
                                text-[12px]
                            '>
                                <span>{sum}</span> nhận xét
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                <div className='rating-detail'>
                <div 
                className='comment-concrete-container
            '>
                    {
                        data.slice(0).reverse().map((item, index)=> {
                            return (
                                <div className='star-container
                                    flex
                                '>
                                    <div className='comment-star-concrete
                                        flex
                                    '>
                                        {
                                            Array.from(Array(5-index).keys()).map(()=>{
                                                return(<AiFillStar color={'FFD25E'}/>)
                                            })
                                        }
                                        {
                                            Array.from(Array(index).keys()).map(()=>{
                                                return(<AiOutlineStar color={'FFD25E'}/>)
                                            })
                                        }
                                    </div>
                                    <ProgressBar 
                                        
                                        completed={item*100/sum} 
                                        isLabelVisible={false} 
                                        height='6px'
                                        className='
                                            mt-[5px]
                                            ml-[8px]
                                            w-[40%]
                                        '
                                    />
                                    <div className='comment-count-concrete
                                        text-[10px] font-primary font-[600]
                                        ml-[8px]
                                    '>
                                        {item}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                </div>
            </div>
            
        );
    }

    const comments = [
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Nguyễn Công Phi',
            star: 5,
            time: '2022/04/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        },  
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Nguyễn Công Phi',
            star: 5,
            time: '2022/04/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Nguyễn Công Phi',
            star: 5,
            time: '2022/04/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Nguyễn Công Phi',
            star: 5,
            time: '2022/04/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Nguyễn Công Phi',
            star: 5,
            time: '2022/04/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Raiden',
            star: 5,
            time: '2022/03/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Raiden',
            star: 5,
            time: '2022/03/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Raiden',
            star: 5,
            time: '2022/03/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Raiden',
            star: 5,
            time: '2022/03/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Raiden',
            star: 5,
            time: '2022/03/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Raiden',
            star: 5,
            time: '2022/03/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Raiden',
            star: 5,
            time: '2022/03/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        {
            userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
            username: 'Raiden',
            star: 5,
            time: '2022/03/22',
            content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        }, 
        // {
        //     userAvatar: 'https://i.pinimg.com/736x/ac/8d/41/ac8d41fffb15f91c58e62b679e998bbc.jpg',
        //     username: 'Nguyễn Công Phi',
        //     star: 4,
        //     time: new Date('2022-04-22'),
        //     content: 'Không giống với nhiều tác phẩm trước đó của Nguyễn Nhật Ánh, Ngồi khóc trên cây được nhà văn đưa vào nhiều nghịch cảnh éo le, bi thương nhằm thử thách các nhân vật và giúp họ trưởng thành hơn về mặt tình cảm theo thời gian. Tác phẩm đã nằm trong tốp những quyển sách Việt Nam được nhiều người đặt mua nhất năm 2013 theo thống kê của nhiều hệ thống phân phối sách trực '    
        // }
    ]

    const refineDateTime = (dateTime) => {
        var dateTimeSplit = dateTime.split('/');
        return dateTimeSplit[2] + '/' + dateTimeSplit[1] + '/' + dateTimeSplit[0];
    }

    const calculateDate = (dateTime) => {
        let commentDate: Date = new Date(dateTime);
        commentDate.setHours(0,0,0,0);
        let currentDate: Date = new Date();
        currentDate.setHours(0,0,0,0);
        var diff = Math.abs(currentDate.getTime() - commentDate.getTime())/1000/60/60/24;
        console.log('diff', diff);
        return `${diff} ngày trước`;  
    }

    const commentItem = (comment) => {
        return (
            <div className ='comment-item-container border-[1px] border-[#333] rounded-[12px] w-[100%] flex font-primary font-[600] mb-3'>
                <div className='avatar-container'>
                    <img 
                        className={
                            'comment-avatar '
                            +'w-[75px] h-[75px] '
                            +'mx-[20px] my-[15px] '
                            +' rounded-[100%]'
                        }
                        src={comment.userAvatar}
                    >
                    </img>
                </div>
                <div className={
                    'comment-detail-container '+ 
                    'mt-[15px] w-[80%]'
                }>
                    <div className={'comment-heading ' + 
                        'flex relative w-[100%]'
                    }>
                        <div className='username'>
                            {comment.username}
                        </div>  
                        <div className='star flex mt-[2px]'>
                            <div className='star-num ml-[20px] leading-5 mr-1'>
                                {comment.star}
                            </div>
                            {
                                Array.from(Array(comment.star).keys()).map(()=>{
                                    return(<AiFillStar color={'FFD25E'} size={20}/>)
                                })
                            }
                            {
                                Array.from(Array(5 - comment.star).keys()).map(()=>{
                                    return(<AiOutlineStar color={'FFD25E'} size={20}/>)
                                })
                            }
                        </div>
                        <div className='comment-time ml-[20px] '>
                            <span className='time'>
                                {refineDateTime(comment.time)}
                            </span>
                            <span className='calculate-time ml-1'>
                                {'(' + calculateDate(comment.time) +')'}
                            </span>
                            
                        </div>
                        <div className={'divider ' + 
                            'w-[calc(108%-24px)] absolute h-[1px] bg-[#c5c5c5] ' +
                            'top-[28px]'
                        }>
                            
                        </div>

                        
                    </div>
                    <div className={'comment-content '+ 'mt-3 w-[calc(100%+20px)] mb-3'}>
                        {comment.content}
                    </div>
                </div>
                
            </div>
        );
    }

    const useStyles = makeStyles({
        root: {
          "& .MuiPagination-ul": {
            textAlign: 'center',
            display: 'flex',
            justifyContent: "center",
            "& > li": {
                "& button": {
                    borderRadius: "50%",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    boxShadow: 'rgba(0, 0, 0, 0.35) 2px 2px 10px',
                    fontFamily: 'Nunito',
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '40px'
                },
            },
            "& .Mui-disabled": {
                background: "#ffffff",
                opacity: '0.25'
            },
            '& .Mui-selected': { 
                backgroundColor: '#2BBCBA',
                color: "#ffffff",
                
            },
            "& > li:first-child": {
              "& button": {
                borderRadius: "50%",
                width: "40px",
                height: "40px",
              },
            },
            "& > li:last-child": {
              "& button": {
                borderRadius: "50%",
                width: "40px",
                height: "40px",
              },
            },
          },
        },
    });

    const renderCommentItems = (comments) => {
        const classes = useStyles();
        let itemPerPage: number = 5;
        const [currentIndex, changeCurrentIndex]  = useState(0);
        const handleChangePage = (page) => {
            console.log("page", page);
            changeCurrentIndex(page - 1);
        }

        return (
            <div className='comment-and-pagination'>
                <div 
                    className='comments-concrete-container 
                        xs:mt-[24px]
                        md:mt-[24px]
                        lg:mt-[24px] 
                        xl:mt-0 xl:ml-[20px]

                '>
                    {
                        comments.map((comment, index) =>{
                            if(index >= currentIndex*itemPerPage && index < (currentIndex+1)*itemPerPage)
                                return (<div>{commentItem(comment)}</div>);
                            else return null;
                        })
                    }
                </div>
                <div
                    className={classes.root + ' mt-4'}
                >
                    <Pagination 
                        count={Math.ceil(comments.length/itemPerPage)} 
                        variant="outlined" 
                        onChange={(e, page) => handleChangePage(page)}
                    />
                </div>
                
            </div>
            
        )
    }

    // const url = window.location.pathname;
    //ƠP
    const currentBook = useSelector((state: RootStateOrAny) => {
        console.log(state);
        return state.bookReducer.currentBook
    });

    const listBook = useSelector((state: RootStateOrAny) => {
        return [
            ...state.bookReducer.books,
            ...state.bookReducer.books,
            ...state.bookReducer.books,
        ]
    })

    
    // const path = asPath.split("/").filter((x) => x);
    // console.log("path", path[1]);

    const userInfo = useSelector((state: RootStateOrAny) => {
        return state.userReducer.infoUser;
    })

    // const path = asPath.split("/").filter((x) => x);
    //     console.log("path", path[1]);
    const { id } = router.query;
    useEffect(() => {
        
        // console.log("id", id)
        // console.log("router", router.asPath);
        const getConcreteProduct = async() => {
            // if(id)
            await axios.get(URL.URL_PRODUCT + '/' + id)
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
        fetchBook()
    },[id])

    console.log("currentBook", currentBook);
    console.log("listBook", listBook);

    const addToCart = () => {
        var dataToAdd = {
            userID: userInfo._id,
            amount: quantityChoosed,
            productID: currentBook._id
        }        
        console.log("dataToAdd", dataToAdd);
        axios.post(URL.URL_ADD_CART, dataToAdd)
            .then((data) => {
                console.log("data", data);
            })
            .catch(() => {

            })
        axios.post(URL.URL_GET_CART, { id: userInfo._id })
        .then(res => {
            dispatch(loadingCart(res.data.cart.listProduct))
        })
        .catch(err => {
            console.log('Lỗi')
        })

    }

    const [ quantityChoosed, setQuantityChosed ] = useState(1);

    return (
        <Layout activeNav={"book"}>
            <Head>
                <title> {!currentBook ? "":currentBook.title}</title>
            </Head>
            <div className='page-wrapper px-[86px]'>

                <div className='book-heading-container mt-16 
                    shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)]
                    rounded-[12px]'>
                    <Grid container spacing={2} >
                        <Grid item xs={12} lg={3} md={4} sm={12} className='p-0 pl-9'>
                            <div className='image-container pt-8 flex justify-around'>
                                {/* <img 
                                    src="https://upload.wikimedia.org/wikipedia/vi/6/61/Ng%E1%BB%93i_kh%C3%B3c_tr%C3%AAn_c%C3%A2y_cover.jpg" 
                                    alt="Sách ngồi khóc trên cây" 
                                    className='w-[calc(100%-24px)] pl-[18px]'
                                /> */}
                                <Carousel className='carousel-slider picture-slider w-[calc(100%-24px)] h-[100%]' showThumbs={false} axis='horizontal'>
                                    {
                                        currentBook ? currentBook.imgList ? currentBook.imgList.map((imgUrl) =>{
                                            return (
                                                <div className='question-picture-container w-[100%] pl-[18px] flex h-[100%]'>
                                                    <img className=' w-[100%] question-picture h-[calc(100%-12px)] object-cover'
                                                        src={imgUrl}
                                                    >   
                                                    </img>
                                                </div>
                                            )
                                        }): null : null
                                    } 
                                </Carousel>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={6} md={7} sm={12} className='mt-[32px] pl-[22px]'>
                            <div className='detail-container pl-[22px]'>
                                <p className='font-bold text-3xl font-primary mb-[10px]'>
                                    {!currentBook ? "":currentBook.title}
                                </p>
                                <div className='w-16 bg-[#2BBCBA] h-1 rounded-sm mb-[14px]'>

                                </div>
                                <div className="descrip-container">
                                    <div className='price-container flex mb-3'>
                                        <p className='price font-primary text-2xl font-[700]'>
                                            {!currentBook ? "":currentBook.price}
                                        </p>
                                        <p className='currentcy font-primary text-lg font-[600] ml-[3px]'>
                                            VNĐ
                                        </p>
                                    </div>
                                    <div className='description text-[14px] mb-[15px] font-primary font-[600]'>
                                        {!currentBook ? "":currentBook.introduction}
                                    </div>
                                    <div className='amount-display flex mb-2 font-primary'>
                                        <p>Còn</p>
                                        <p className='amount-number mr-[4px] ml-[4px] text-[#2BBCBA] font-[600]'>
                                            {!currentBook ? "":currentBook.quantity}
                                        </p>
                                        <p>cuốn</p>
                                    </div>
                                    <div className='buy-section flex mb-[60px]'>
                                        <div className='quantity-choosing flex mr-[27px]'>
                                            <div 
                                                className='decreasing-button h-[40px] w-[24px] leading-[40px] text-center border-[1px] 
                                                hover:bg-[#e5e5e5] hover:cursor-pointer select-none'
                                                onClick={() => {
                                                    if(quantityChoosed>1)
                                                    setQuantityChosed(quantityChoosed-1);
                                                }}
                                            >-</div>
                                            <input type='number' 
                                                className='border-[1px] w-[40px] h-[40px] text-center' 
                                                value={quantityChoosed}
                                            />
                                            <div
                                                onClick={() => {
                                                    if(quantityChoosed<currentBook.quantity)
                                                    setQuantityChosed(quantityChoosed+1);
                                                }} 
                                                className='increasing-button h-[40px] w-[24px] leading-[40px] text-center border-[1px] 
                                                    hover:bg-[#e5e5e5] hover:cursor-pointer select-none'
                                            >+</div>
                                        </div>
                                        <div 
                                            onClick={() => {
                                                addToCart();
                                            }}
                                            className='buy-button text-[16px] leading-[40px] bg-[#2BBCBA] px-[20px] text-white rounded-[4px]
                                                hover:opacity-80 hover:cursor-pointer
                                            '
                                        >
                                            MUA HÀNG
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={3} md={12} sm={12} className='flex '>
                            <div className='divider w-[1px] h-[calc(100%-40px)] bg-[#c5c5c5] mr-[10px] ml-[-1px]'></div>
                            <div className='book-info w-[calc(100%-20px)] h-[250px] text-[16px] border-[1px] border-[#2BBCBA] 
                                    pl-[20px] p-[20px] rounded-[12px]
                                    mb-[40px]
                            '>
                                <div className='description-item flex'>
                                    <p className="text-[#808080]">Tác giả:</p>
                                    <p className='ml-[4px] text-[#555555]'>
                                        {!currentBook ? "": currentBook.author}
                                    </p>  
                                </div>
                                <div className='divider w-[calc(100%-10px)] h-[1px] bg-[#c5c5c5] mb-[8px] mt-[-6px]'></div>
                                <div className='description-item flex'>
                                    <p className="text-[#808080]">Nhà xuất bản:</p>
                                    <p className='ml-[4px] text-[#555555]'>{!currentBook ? "":currentBook.publisher}</p>  
                                </div>
                                <div className='divider w-[calc(100%-10px)] h-[1px] bg-[#c5c5c5] mb-[8px] mt-[-6px]'></div>
                                <div className='description-item flex'>
                                    <p className="text-[#808080]">Dạng bìa:</p>
                                    <p className='ml-[4px] text-[#555555]'>{!currentBook ? "":currentBook.format}</p>  
                                </div>
                                <div className='divider w-[calc(100%-10px)] h-[1px] bg-[#c5c5c5] mb-[8px] mt-[-6px]'></div>
                                <div className='description-item flex'>
                                    <p className="text-[#808080]">Tình trạng:</p>
                                    <p className='ml-[4px] text-[#555555]'>
                                        {
                                            currentBook && currentBook.quantity > 0 ?
                                                <>Còn hàng</> : <>Hết hàng</>
                                        }
                                    </p>  
                                </div>
                                <div className='divider w-[calc(100%-10px)] h-[1px] bg-[#c5c5c5] mb-[8px] mt-[-6px]'></div>
                                <div className='description-item flex'>
                                    <p className="text-[#808080]">Năm phát hành:</p>
                                    <p className='ml-[4px] text-[#555555]'>{!currentBook ? "":currentBook.publishYear}</p>  
                                </div>  
                            </div>
                        </Grid>
                        
                    </Grid>
                </div>  
                
                <div className='book-description mt-16 
                    shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)]
                    rounded-[12px] w-[100%]'>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={1}>
                            <div 
                                className='description-label text-[#2BBCBA] ml-[18px] mt-[18px] 
                                    mb-[10px] text-[20px] font-primary'
                            >
                                Mô tả
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}  md={12} lg={11} className='flex'>
                            <div className='divider w-[1px] h-[calc(100%-40px)] bg-[#C5C5C5] mt-[20px]'></div>
                            <div className='description-content text-[14px] ml-[18px] py-[18px] mr-[18px]'>
                                {!currentBook ? "":currentBook.detailInfomation}
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className='book-detail-addition mt-16 
                    shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)]
                    rounded-[12px] w-[100%]'>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={1}>
                            <div 
                                className='description-label text-[#2BBCBA] ml-[18px] 
                                    mt-[18px] mb-[10px] text-[20px] font-primary'>
                                Thông tin bổ sung
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}  md={12} lg={11} className='flex'>
                            <div className='divider w-[1px] h-[calc(100%-40px)] bg-[#C5C5C5] mt-[20px]'></div>
                            <div className='detail-content w-[calc(100%-40px)] text-[14px] ml-[18px] py-[18px] mr-[18px]'>
                                <div className='description-item flex'>
                                    <p className="text-[#808080]">Số trang:</p>
                                    <p className='ml-[4px] text-[#555555]'>
                                        {!currentBook ? "":currentBook.pageAmount}
                                    </p>  
                                </div>
                                <div className='divider w-[calc(100%-10px)] h-[1px] bg-[#c5c5c5] mb-[8px] mt-[-6px]'></div>
                                <div className='description-item flex'>
                                    <p className="text-[#808080]">Kích thước:</p>
                                    <p className='ml-[4px] text-[#555555]'>
                                        {!currentBook ? "":currentBook.size}
                                    </p>  
                                </div>
                                <div className='divider w-[calc(100%-10px)] h-[1px] bg-[#c5c5c5] mb-[8px] mt-[-6px]'></div>
                                <div className='description-item flex'>
                                    <p className="text-[#808080]">Nhà xuất bản:</p>
                                    <p className='ml-[4px] text-[#555555]'>
                                        {!currentBook ? "":currentBook.publisher}
                                    </p>  
                                </div>
                                <div className='divider w-[calc(100%-10px)] h-[1px] bg-[#c5c5c5] mb-[8px] mt-[-6px]'></div>
                                <div className='description-item flex'>
                                    <p className="text-[#808080]">Từ khoá:</p>
                                    <p className='ml-[4px] text-[#555555]'>{!currentBook ? "":currentBook.keyword}</p>  
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className='relative-book-section 
                    shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)]
                    rounded-[12px] w-[100%] mt-[62px] pb-[18px] pl-[18px] mb-[62px]'>
                        <div 
                            className='description-label text-[#2BBCBA] 
                                pt-[28px] mb-[24px] text-[20px] font-primary'
                        >
                            Sản phẩm liên quan
                        </div>
                        <div className="bookitem-container">
                            <Slider {...settings} className='relative'>
                                {
                                    listBook.map((value) => {
                                        return (
                                            <BookItem bookInfo={value}/>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                        
                </div>
                <div className='comment-section
                    shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)]
                    rounded-[12px] w-[100%] mt-[62px] pb-[18px] pl-[18px] mb-[62px]'>
                    <Grid 
                        xs={12} md={12} lg={12} 
                        className='title 
                            font-primary text-[#2BBCBA] font-[500] text-[20px]
                            mt-[38px] pt-[28px]
                        '
                    >
                        Nhận xét, đánh giá từ khách hàng
                    </Grid>
                    <Grid container 
                        className='comment-container mt-[16px]'
                    >
                        <Grid item xs={12} md={12} lg={3}
                            className='rating-grid relative'
                        >
                            {ratingConcreteRender(data)}
                           <div 
                                className='divider 
                                    h-[100%] w-[1px] 
                                    bg-[#C5C5C5]
                                    absolute
                                    top-0
                                    right-[6px]
                                    md:hidden xs:hidden sm:hidden lg:hidden xl:block
                                '
                            ></div>

                        </Grid>
                        <Grid 
                            item xs={12} md={12} lg={9}
                            className='comment-grid'
                        >
                            <div 
                                className='comment-container 
                                    mr-[12px] 
                                '
                            >
                                {renderCommentItems(comments)}
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </div>
            
        </Layout>
    )
}


export default BookPage