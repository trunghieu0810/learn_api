import React, { useState, useEffect } from 'react'
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'
import Link from 'next/link'
import { Divider, TextField, Button } from '@mui/material'
import { BsFacebook } from 'react-icons/bs'
import { AiFillGoogleCircle } from 'react-icons/ai'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { useRouter } from 'next/router';


import LinearProgress from '@mui/material/LinearProgress';
import styleLogin from '../styles/Login.module.css'
import { userLogin } from '../redux/actions/userAction';
import { showAlertSuccess, showAlertError } from '../redux/actions/alertAction'
import * as URL from '../services/api/config'
import { limitText } from '../helper/limitText'
import { CheckMail } from '../helper/checkMail'
import { CheckSpecialCharacters } from '../helper/checkSpecialCharaters'
function Register(props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const isLogin = useSelector((state: RootStateOrAny) => state.userReducer.isLogin)
    const [email, setEmail] = useState({
        value: '',
        isError: false,
        helperText: ''
    })

    const [accountName, setAccountName] = useState({
        value: '',
        isError: false,
        helperText: ''
    })

    const [pass, setPass] = useState({
        value: '',
        isError: false,
        helperText: ''
    })

    const [rePass, setRePass] = useState({
        value: '',
        isError: false,
        helperText: ''
    })

    const status = useSelector((state: RootStateOrAny) => state.userReducer)


    if (!status.isLoading) return (<LinearProgress></LinearProgress>)
    
    if (status.isLogin) router.push('/')

    const HandleClickRegister = async (e) => {
        e.preventDefault()
        if (email.value == '' || accountName.value == '' || pass.value == '' || rePass.value == '') {
            console.log('Nhập đầy đủ các  trường')
            e.preventDefault()
        } else if (email.isError || accountName.isError || pass.isError || rePass.isError) {
            console.log('Lỗi')
            e.preventDefault()
        } else {
            let data: Object = {
                mail: email.value,
                username: accountName.value,
                password: pass.value
            }
            axios.post(URL.URL_REGISTER, { ...data })
                .then(res => {
                    if (res.data.status == 0) {
                        dispatch(showAlertError(res.data.message))
                    } else {
                        dispatch(userLogin(res.data))
                        dispatch(showAlertSuccess(res.data.message))
                    }
                })

        }
    }

    const HandleChangeAccount = (e) => {
        limitText(e, 20)
        if (!CheckSpecialCharacters(e.target.value) || e.target.value.length === 0) {
            setAccountName({
                value: e.target.value,
                isError: false,
                helperText: null,
            })
        } else {
            setAccountName({
                ...accountName,
                isError: true,
                helperText: 'Tên tài khoản chứa kí tự đặc biệt'
            })
        }

    }

    const HandleChangeEmail = (e) => {
        limitText(e, 30)

        if (CheckMail(e.target.value) || e.target.value.length === 0) {
            setEmail({
                value: e.target.value,
                isError: false,
                helperText: null,
            })
        } else {
            setEmail({
                ...email,
                isError: true,
                helperText: 'Email không đúng định dạng'
            })
        }
    }

    const HandleChangePass = (e) => {
        limitText(e, 20)

        if (e.target.value.length >= 6 || e.target.value.length == 0) {
            if (!CheckSpecialCharacters(e.target.value)) {
                setPass({
                    value: e.target.value,
                    isError: false,
                    helperText: null,
                })
                if (e.target.value == rePass.value) {
                    setRePass({
                        ...rePass,
                        isError: false,
                        helperText: null,
                    })
                } else {
                    setRePass({
                        ...rePass,
                        isError: true,
                        helperText: 'Nhập lại mật khẩu không đúng',
                    })
                }
            } else {
                setPass({
                    ...pass,
                    isError: true,
                    helperText: 'Mật khẩu chưa kí tự đặc biệt'
                })
            }
        } else {
            setPass({
                ...pass,
                isError: true,
                helperText: 'Mất khẩu phải từ 6 kí tự trở lên'
            })
        }
    }

    const HandleChangeRePass = (e) => {
        limitText(e, 20)
        if (e.target.value === pass.value) {
            setRePass({
                value: e.target.value,
                isError: false,
                helperText: null,
            })
        } else {
            setRePass({
                value: e.target.value,
                isError: true,
                helperText: 'Nhập lại mật khẩu không đúng',
            })
        }
    }

    const HandleKeyUp = (e) => {
        if (e.key === 'Enter') {
            let elenmentRegisterButton: HTMLElement = document.querySelector('.btn-register')
            elenmentRegisterButton.click()
        }
    }

    const responseGoogle = async (response) => {
        await axios.post(URL.URL_REGISTER_WITH_GOOGLE, {...response.profileObj}).then(res => {
            if (res.data.status == 0) {
                dispatch(showAlertError(res.data.message))
            } else {
                dispatch(userLogin(res.data))
                dispatch(showAlertSuccess(res.data.message))
            }
        })
        console.log('click')
    }
    return (
        <div style={props.isMobile ? { width: '400px', height: '80%', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' } : null} className={styleLogin.modalLogin + ' ' + styleLogin.formRegister}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ height: '24px' }} className={styleLogin.loginDirection}>
                    <Link href={'/'} passHref>
                        <BsArrowLeftSquareFill style={{ lineHeight: '10px', marginRight: '5px' }}></BsArrowLeftSquareFill>
                    </Link>
                    <Link href={'/'} passHref>
                        <p style={{ marginBottom: '0' }}>Trang chủ</p>
                    </Link>
                </div>
                <div style={{ height: '24px' }} className={styleLogin.loginDirection}>
                    <Link href={'/login'} passHref>
                        <p style={{ marginBottom: '0' }}>Đăng nhập</p>
                    </Link>
                    <Link href={'/login'} passHref>
                        <BsArrowRightSquareFill style={{ lineHeight: '10px', marginLeft: '5px' }}></BsArrowRightSquareFill>
                    </Link>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img style={{ display: props.isMobile ? 'none' : 'block' }} height='130px' width='200px' src='/img/logo.png'></img>
                <div style={props.isMobile ? { fontSize: '1.6rem' } : { fontSize: '2.4rem' }}>GOOD BOOK</div>
                <div style={{ fontSize: props.isMobile ? '1.4rem' : '2rem', fontWeight: '500', color: '#2BBCBA' }}>Đăng ký</div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <TextField
                        id="outlined-required"
                        label="Email"
                        fullWidth
                        size='small'
                        error={email.isError}
                        helperText={email.helperText}
                        onKeyUp={(e) => HandleKeyUp(e)}
                        onChange={(e) => HandleChangeEmail(e)}
                    />
                </div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <TextField
                        id="outlined-required"
                        label="Tên tài khoản"
                        size='small'
                        fullWidth
                        error={accountName.isError}
                        helperText={accountName.helperText}
                        onChange={(e) => HandleChangeAccount(e)}
                        onKeyUp={(e) => HandleKeyUp(e)}
                    />
                </div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <TextField
                        id="outlined-password-input"
                        label="Mật khẩu"
                        type="password"
                        size='small'
                        onChange={(e) => HandleChangePass(e)}
                        onKeyUp={(e) => HandleKeyUp(e)}
                        error={pass.isError}
                        helperText={pass.helperText}
                        fullWidth
                        autoComplete="current-password"
                    />
                </div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <TextField
                        id="outlined-password-input"
                        label="Nhập lại mật khẩu"
                        size='small'
                        type="password"
                        onChange={(e) => HandleChangeRePass(e)}
                        onKeyUp={(e) => HandleKeyUp(e)}
                        error={rePass.isError}
                        helperText={rePass.helperText}
                        fullWidth
                        autoComplete="current-password"
                    />
                </div>
            </div>
            <div style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                <Link href={'/'} passHref>
                    <Button onClick={(e) => HandleClickRegister(e)} className='btn-register' fullWidth style={{ backgroundColor: '#2BBCBA', color: 'white', height: '40px', fontSize: '1.2rem' }} variant="contained">ĐĂNG KÝ</Button>
                </Link>
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.4)', marginBottom: '35px', paddingLeft: '60px', paddingRight: '60px', width: '100%', height: '1px', marginTop: '20px' }}>
                <Divider orientation='horizontal' flexItem>
                    Hoặc
                </Divider>
            </div>
            <div style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer', justifyContent: 'space-evenly', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                <div style={{ cursor: 'pointer', fontSize: '2rem', height: '50px', width: '50px', color: '#36589D', borderRadius: '50%', padding: '5px', border: '1px solid #36589D', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <BsFacebook></BsFacebook>
                </div>
                <div style={{ cursor: 'pointer', fontSize: '2rem', height: '50px', width: '50px', color: '#EA230F', borderRadius: '50%', padding: '5px', border: '1px solid #EA230F', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <GoogleLogin
                        clientId="826925109796-mi95l41fi57bdlolpvnfdg5bpt9oc81h.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                            <AiFillGoogleCircle onClick={renderProps.onClick}></AiFillGoogleCircle>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

export default Register;