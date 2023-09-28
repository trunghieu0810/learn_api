
import React, { useEffect } from 'react'
import Layout from '../component/Layout'
import axios from 'axios'
const Store: React.FC = () => {

  useEffect(() => {
    // axios.get(`http://localhost:3000/api/product/add-new-product`)
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }, [])

  return (
    <Layout active="store">
      <h2 onLoadStart={() => { console.log('Loading') }}>Cửa hàng ở đây</h2>
    </Layout>
  )
}


export default Store

