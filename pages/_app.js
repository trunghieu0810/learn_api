import '../styles/globals.css'
import '../styles/bookpage.css'

import '../styles/layout.css'
import '../styles/profile.css'
import '../styles/TableManage.css';
import Head from 'next/head'
import { createWrapper } from 'next-redux-wrapper'
import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from '../redux/store'
import AlertGoodBook from '../component/Alert'
import { getAccessToken, setAccessToken } from '../utils/cookies'
import axios from 'axios'
import { useState } from 'react'
import * as URL from '../services/api/config'
import { userLogin, userLoginFail } from '../redux/actions/userAction'

const MyApp = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetApi = async () => {
      const token = getAccessToken()
      if (token !== null || token !== undefined) {
        await axios.post(URL.URL_REFRESH).then(res => {
          if (res.data.status == 1) {
            setAccessToken(res.data.token)
            dispatch(userLogin(res.data))
          } else {
            dispatch(userLoginFail())
          }
        }).catch(err => {
          dispatch(userLoginFail())
        });
      } else {
        dispatch(userLoginFail())
      }
    }
    fetApi()
  }, [])



  return (
    <div className='root-app'>
      <Provider store={store}>
        <Head>
          <link rel='icon' href='/img/logo.png'></link>
          <link rel='stylesheet' href='/css/global.css'></link>
        </Head>
        <Component {...pageProps} />
        <AlertGoodBook></AlertGoodBook>
      </Provider>
    </div>
  )
}

const makestore = () => store;
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)
