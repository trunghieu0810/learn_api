import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link'
import style from '../styles/Layout.module.css';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { userLogout } from '../redux/actions/userAction';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { setAccessToken } from '../utils/cookies';
import { setSearch } from '../redux/actions/searchAction'
import { KeyboardEvent } from "react";
import dynamic from 'next/dynamic';
import * as URL from '../services/api/config'
import { loadingCart } from '../redux/actions/cartAction'
import axios from 'axios';
const CartItemInNavBar = dynamic(() => import('./Cart/CarItemInNavBar'))

const pages = [
    {
        id: 'home',
        name: 'Trang chủ',
        url: '/',
        active: 'home',
    },
    // {
    //     id: 'book',
    //     name: 'Sách',
    //     url: '/store',
    //     active: 'store'
    // }
]

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));




const NavBar = (props) => {
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootStateOrAny) => state.userReducer.isLogin)
    const infoUser = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const search = useSelector((state: RootStateOrAny) => state.searchReducer.search)
    const cart = useSelector((state: RootStateOrAny) => state.cart);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchoElMess, setAnchorElMess] = React.useState<null | HTMLElement>(null);
    const [anchoElCart, setAnchoElCart] = React.useState<null | HTMLElement>(null);
    const searchRef = React.useRef(null)
    React.useEffect(() => {
        const fetApi = async () => {
            if (isLogin) {
                axios.post(URL.URL_GET_CART, { id: infoUser._id })
                    .then(res => {
                        dispatch(loadingCart(res.data.cart.listProduct))
                    })
                    .catch(err => {
                        console.log('Lỗi')
                    })
            }
        }
        fetApi()
    }, [isLogin])

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenMessMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElMess(event.currentTarget);
    }
    const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchoElCart(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCloseMessMenu = () => {
        setAnchorElMess(null);
    };
    const handleCloseCartMenu = () => {
        setAnchoElCart(null);
    }

    const handleClickLogout = () => {
        setAnchorElUser(null);
        dispatch(userLogout())
        setAccessToken(null)
    }

    const handleKeyPressSearch = (e: KeyboardEvent) => {
        if (e.key == 'Enter') {
            searchRef?.current?.click()
        }
    }

    // console.log("", cart.cart.reduce((total, item) => (total += item.quantity), 0));
    console.log("cart.cart",cart.cart);
    const renderStatusLogin = () => {
        if (isLogin) {
            return (
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open cart">
                        <IconButton onClick={handleOpenCartMenu} size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={cart.cart.reduce((total, item) => (total += item.quantity), 0)} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={infoUser.avatar ? infoUser.avatar : ''} />
                            <div className='text-base font-medium text-white ml-[5px] md:hidden lg:block'></div>
                        </IconButton>
                    </Tooltip>
                    {/* Cart */}
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchoElCart}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}

                        className='cart-navbar'
                        open={Boolean(anchoElCart)}
                        style={{ borderRadius: '20px' }}
                        onClose={handleCloseCartMenu}
                    >
                        <div style={{ width: '300px', borderRadius: '30px' }} onClick={handleCloseCartMenu}>
                            <div className={style.headerCart} >
                                <span style={{ fontSize: '14px', lineHeight: '1.5', fontWeight: '500' }}>{cart.cart.reduce((total, item) => (total += item.quantity), 0)} sản phẩm</span>
                                <Link href={'/cart'} passHref>
                                    <a style={{ textDecoration: 'none', fontSize: '14px', fontWeight: '500', color: '#2f5acf', lineHeight: '1.5' }}>Xem tất cả</a>
                                </Link>
                            </div>
                            <ul style={{ maxHeight: '400px', paddingTop: '30px', paddingLeft: '0' }}>
                                {
                                    cart.cart.length !== 0 ? cart.cart.map(value => (
                                        <li>
                                            <CartItemInNavBar detailCart={value}></CartItemInNavBar>
                                        </li>
                                    )) : (
                                        <h2 style={{ textAlign: 'center' }}>Giỏ hàng trống</h2>
                                    )
                                }
                            </ul>
                        </div>
                    </Menu>
                    {/* Message */}
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchoElMess}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchoElMess)}
                        onClose={handleCloseMessMenu}
                    >
                        <div onClick={handleCloseMessMenu}>
                            <ul>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                                <li>Hello</li>
                            </ul>
                        </div>
                    </Menu>
                    {/* Profile */}
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center" fontWeight="bold">{infoUser.name ? infoUser.name : 'Chưa có tên'}</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Link href='/profile' passHref>
                                <div >
                                    <Typography textAlign="center">Profile</Typography>
                                </div>
                            </Link>
                        </MenuItem>
                        <Divider light />
                        <MenuItem onClick={handleClickLogout}>
                            <Typography textAlign="center">Đăng xuất</Typography>
                        </MenuItem>
                    </Menu>
                </Box >
            )
        } else {
            return (
                <Box sx={{ flexGrow: 1, display: { md: 'flex' }, justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <div style={{ position: 'relative' }}>
                            <Link href='/login' passHref>
                                <Button className={style.navItemLine} style={{ color: 'white', fontWeight: '600', textTransform: 'none' }}>Đăng nhập</Button>
                            </Link>
                        </div>
                        <Divider style={{ color: 'white', width: '3px', height: '20px', backgroundColor: 'white', transform: 'translateY(+40%)' }} orientation="vertical" flexItem />
                        <div style={{ position: 'relative' }}>
                            <Link href='/register' passHref>
                                <Button className={style.navItemLine} style={{ color: 'white', fontWeight: '600', textTransform: 'none' }}>Đăng ký</Button>
                            </Link>
                        </div>
                    </div>
                </Box >
            )
        }
    }

    return (
        <AppBar style={{ backgroundColor: '#2BBCBA' }} position="static">
            <Container maxWidth={"xl"}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <img
                            alt=""
                            src='/img/logo.png'
                            width="70"
                            height="40"
                            style={{ borderRadius: '50%', marginRight: '5px' }}
                            className="d-inline-block align-top"></img>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link href={page.url} passHref>
                                            <Button style={{ color: 'black', fontWeight: '500' }}>{page.name}</Button>
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                            {
                                (!infoUser.role || infoUser.role === 'user') ? null : (
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <Link href={'/admin/dashboard'} passHref>
                                                <Button style={{ color: 'black', fontWeight: '500' }}>Thống kê</Button>
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                )
                            }

                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Search style={{ backgroundColor: 'white', color: '#979797' }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Nhập tên sách cần tìm"
                                onChange={(e) => {  dispatch(setSearch(e.target.value)) }}
                                defaultValue={search}
                                onKeyDown={handleKeyPressSearch}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <Link href={`/search?search=${search}`} passHref>
                                <div ref={searchRef} className='bg-transparent w-7 h-6 absolute top-2 left-2 z-50 cursor-pointer' onClick={() => { console.log('click') }}></div>
                            </Link>
                        </Search>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <div key={index} style={{ position: 'relative' }}>
                                <Link href={page.url} passHref>
                                    <Button className={props.active === page.active ? style.activeItem + ' ' + style.navItemLine : style.navItemLine} style={{ color: 'white', fontWeight: '600' }}>{page.name}</Button>
                                </Link>
                            </div>
                        ))}
                        {
                            (!infoUser.role || infoUser.role === 'user') ? null : (
                                <div style={{ position: 'relative' }}>
                                    <Link href={'/admin/dashboard'} passHref>
                                        <Button className={props.active === 'admin' ? style.activeItem + ' ' + style.navItemLine : style.navItemLine} style={{ color: 'white', fontWeight: '600' }}>Thống kê</Button>
                                    </Link>
                                </div>
                            )
                        }
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Search style={{ backgroundColor: 'white', color: '#979797' }}>
                            <SearchIconWrapper >
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={(e) => { console.log(e.target.value); dispatch(setSearch(e.target.value)) }}
                                placeholder="Nhập tên sách cần tìm"
                                defaultValue={search}
                                onKeyDown={handleKeyPressSearch}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <Link href={`/search?search=${search}`} passHref>
                                <div ref={searchRef} className='bg-transparent w-7 h-6 absolute top-2 left-2 z-50 cursor-pointer' onClick={() => { console.log('click') }}></div>
                            </Link>
                        </Search>
                    </Box>
                    {renderStatusLogin()}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
