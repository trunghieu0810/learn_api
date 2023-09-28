import React, { useState, useEffect, useLayoutEffect } from 'react'
import Head from 'next/head'
import styleLogin from '../styles/Login.module.css'

import LinearProgress from '@mui/material/LinearProgress';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import { useRouter } from 'next/router';
const Login = dynamic(() => import('../component/Login'), {ssr: true});
const LoginPage = () => {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(true);
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 700) {
        setIsMobile(false)
      } else {
        setIsMobile(true)
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [isMobile]);


  const status = useSelector((state: RootStateOrAny) => state.userReducer)

  if (!status.isLoading) return (<LinearProgress></LinearProgress>)
  
  if (status.isLogin) router.push('/')

  return (
    <div>
      <Head>
        <meta charSet="UTF-8"></meta>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="stylesheet" href="..." />
        <title>Đăng nhập</title>
      </Head>
      <div style={{ display: 'flex', position: 'relative' }}>
        <div  style={{display:'flex', justifyContent: 'center',alignItems:'center'}} className={styleLogin.imgLogin}>
          {isMobile ? <Login isMobile={true}></Login> : null}
        </div>
        {!isMobile ? <Login isMobile={false}></Login> : null}
      </div>
    </div>
  )
}


export default LoginPage

