import Head from 'next/head';
import React from 'react'
import Footer from './Footer';
import NavBar from './NavBar'
 

const Layout = (props) => {

    return (
        <div>
            <Head>
                <meta charSet="UTF-8"></meta>
                {/* <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="stylesheet" href='/css/global.css'></link> */}
                <title>Selling Book</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet"></link>
            </Head>
            <header>
                <NavBar active={props.active}></NavBar>
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}

export default Layout