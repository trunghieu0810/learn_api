import React, { useState, useEffect } from 'react'
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs'
import Link from 'next/link'
import { Button, TextField } from '@mui/material'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'

import LinearProgress from '@mui/material/LinearProgress';
import { getCodeAgain } from '../redux/actions/codeAction'
import { makeCode } from '../helper/makeCode'
import { sendCode } from '../services/sendMail'
import styleLogin from '../styles/Login.module.css'
import * as URL from '../services/api/config'
import { reset } from '../redux/actions/codeAction';
import { showAlertSuccess, showAlertError } from '../redux/actions/alertAction'
import { CheckSpecialCharacters } from '../helper/checkSpecialCharaters'
import { limitText } from '../helper/limitText'

function ConfirmCode(props) {
    const dispatch = useDispatch();
    const code = useSelector((state: RootStateOrAny) => state.codeReducer.code)
    const email = useSelector((state: RootStateOrAny) => state.codeReducer.email)
    const isLoading = useSelector((state: RootStateOrAny) => state.codeReducer.loading)
    const isLogin = useSelector((state: RootStateOrAny) => state.userReducer.isLogin)
    const [isCheckCode, setIsCheckCode] = useState(false);
    const [codeClient, setCodeClient] = useState('');
    const router = useRouter();
    const status = useSelector((state: RootStateOrAny) => state.userReducer)


    if (!status.isLoading) return (<LinearProgress></LinearProgress>)
    
    if (status.isLogin) router.push('/')

    if (!isLoading) router.push('/forget-password')

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

    const sendCodeAgain = () => {
        let code: String = makeCode(6);
        if (sendCode(code, email)) {
            dispatch(getCodeAgain(code))
        }
    }

    const HandleChangeCode = (e) => {
        limitText(e, 6)
        setCodeClient(e.target.value)
    }

    const HandleChangeNewPass = (e) => {
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

    const HandleChangeReNewPass = (e) => {
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

    const HandleClickComfirmCode = async (e) => {
        console.log(pass.value)
        console.log(rePass.value)
        console.log(codeClient)
        if (pass.value == '' || rePass.value == '' || codeClient == '') {
            dispatch(showAlertError('Nhập đầy đủ các trường'))
            e.preventDefault()
        } else if (pass.isError || rePass.isError) {
            dispatch(showAlertError('Mật khẩu không đúng định dạng'))
            e.preventDefault()
        }
        else if (codeClient !== code) {
            dispatch(showAlertError('Nhập mã code không đúng'))
            setIsCheckCode(true)
            e.preventDefault();
        }
        else {
            await axios.post(URL.URL_CONFIRM_CODE, { mail: email, password: pass.value })
                .then(res => {
                    if (res.data.status == 0) {
                        e.preventDefault();
                        dispatch(showAlertError(res.data.message))
                    } else {
                        dispatch(showAlertSuccess(res.data.message))
                        dispatch(reset())
                    }
                })
        }
    }


    const HandleKeyUp = (e) => {
        if (e.key === 'Enter') {
            let elenmentLinkComfirmCode: HTMLElement = document.querySelector('.comfirm-code')
            elenmentLinkComfirmCode.click()
        }
    }


    return (
        <div style={props.isMobile ? { width: '400px', height: '80%', borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' } : null} className={styleLogin.modalLogin + ' ' + styleLogin.formForgetPass}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ height: '24px' }} className={styleLogin.loginDirection}>
                    <Link href={'/forget-password'} passHref>
                        <BsArrowLeftSquareFill style={{ marginRight: '5px' }}></BsArrowLeftSquareFill>
                    </Link>
                    <Link href={'/forget-password'} passHref>
                        <p style={{ marginBottom: '0' }}>Nhập lại email</p>
                    </Link>
                </div>
                <div style={{ height: '24px' }} className={styleLogin.loginDirection}>
                    <Link href={'/login'} passHref>
                        <p style={{ marginBottom: '0' }}>Đăng nhập</p>
                    </Link>
                    <Link href={'/login'} passHref>
                        <BsArrowRightSquareFill style={{ marginLeft: '5px' }}></BsArrowRightSquareFill>
                    </Link>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img height={props.isMobile ? '80px' : '130px'} width={props.isMobile ? '130px' : '200pxpx'} src='/img/logo.png'></img>
                <div style={props.isMobile ? { fontSize: '1.6rem' } : { fontSize: '2.4rem' }}>GOOD BOOK</div>
                <div style={{ fontSize: props.isMobile ? '1.4rem' : '2rem', fontWeight: '500', color: '#2BBCBA' }}>Quên mật khẩu</div>
                <div style={{ marginBottom: '15px', display: 'flex', textDecoration: 'none', justifyContent: 'start', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <p>Mã code đã được gửi về email {email}</p>
                    <p>{code}</p>
                </div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '5px' }}>
                    <TextField
                        id="outlined-required"
                        label="Nhập mã code"
                        fullWidth
                        placeholder='VD: 123456'
                        size={props.isMobile ? 'small' : 'medium'}
                        name='code'
                        onKeyUp={(e) => HandleKeyUp(e)}
                        onChange={(e) => HandleChangeCode(e)}
                    />
                </div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <TextField
                        id="outlined-password-input"
                        label="Mật khẩu mới"
                        type="password"
                        size={props.isMobile ? 'small' : 'medium'}
                        fullWidth
                        autoComplete="current-password"
                        onKeyUp={(e) => HandleKeyUp(e)}
                        onChange={(e) => HandleChangeNewPass(e)}
                        error={pass.isError}
                        helperText={pass.helperText}
                    />
                </div>
                <div style={{ paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '20px' }}>
                    <TextField
                        id="outlined-password-input"
                        label="Nhập lại mật khẩu"
                        type="password"
                        fullWidth
                        autoComplete="current-password"
                        size={props.isMobile ? 'small' : 'medium'}
                        error={rePass.isError}
                        helperText={rePass.helperText}
                        onKeyUp={(e) => HandleKeyUp(e)}
                        onChange={(e) => HandleChangeReNewPass(e)}
                    />
                </div>
            </div>
            {isCheckCode && (
                <div style={{ color: '#EA230F', display: 'flex', textDecoration: 'none', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '5px' }}>
                    <p>*Mã code không hợp lệ</p>
                    <p onClick={() => sendCodeAgain()} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                        Gửi lại mã
                    </p>
                </div>
            )}
            <div style={{ display: 'flex', textDecoration: 'none', cursor: 'pointer', justifyContent: 'space-between', paddingLeft: '60px', paddingRight: '60px', width: '100%', marginTop: '10px' }}>
                <Link href='login' passHref>
                    <Button onClick={(e) => HandleClickComfirmCode(e)} className='comfirm-code' fullWidth style={{ backgroundColor: '#2BBCBA', color: 'white', height: props.isMobile ? '40px' : '50px', fontSize: props.isMobile ? '1.2rem' : '1.4rem' }} variant="contained">Xác nhận</Button>
                </Link>
            </div>
        </div>
    );
}

export default ConfirmCode;