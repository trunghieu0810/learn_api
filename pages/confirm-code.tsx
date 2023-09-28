
import React, { useLayoutEffect, useState } from 'react'
import Head from 'next/head'
import styleLogin from '../styles/Login.module.css'
import '../styles/Login.module.css'
import LinearProgress from '@mui/material/LinearProgress';
import dynamic from 'next/dynamic';

const ConfirmCode = dynamic(() => import('../component/ConfirmCode'),
    {
        ssr: true,
        loading: () => <LinearProgress></LinearProgress>
    }
);

const ConfirmCodePage = () => {
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

    return (
        <div>
            <Head>
                <meta charSet="UTF-8"></meta>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>Tìm lại mật khẩu</title>
            </Head>
            <div style={{ display: 'flex', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={styleLogin.imgLogin}>
                    {isMobile ? <ConfirmCode isMobile={true}></ConfirmCode> : null}
                </div>
                {!isMobile ? <ConfirmCode isMobile={false}></ConfirmCode> : null}
            </div>
        </div >
    )
}


export default ConfirmCodePage

