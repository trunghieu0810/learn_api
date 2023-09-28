import React from "react";
import Link from 'next/link'
import { Grid, Container } from '@mui/material'
import { GrLocation } from 'react-icons/gr'
import { HiOutlinePhone } from 'react-icons/hi'
import { AiOutlineMail } from 'react-icons/ai'
import { BsTwitter, BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'
import 'bootstrap/dist/css/bootstrap.css'


import style from '../styles/Layout.module.css'

const Footer = () => {
    return (
        <div style={{ borderTop: '1px solid #2BBCBA' }}>
            <Container style={{ marginTop: '37px' }}>
                <Grid style={{ borderBottom: '1px solid #C5C5C5' }} container spacing={2}>
                    <Grid xl={3} lg={3} sm={6} md={6} item xs={12}>
                        <div >
                            <p className={style.footerTitle}>Hỗ trợ khách hàng</p>
                            <p style={{ fontSize: '1.1rem', color: 'black' }}>Hotline đặt hàng</p>
                            <p>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>19522055</a>
                                </Link>
                            </p>
                            <p>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>19522006</a>
                                </Link>
                            </p>
                            <p>
                                <Link href='#' passHref>
                                    <a className={style.footerItem1}>19522055@gm.uit.edu.vn</a>
                                </Link>
                            </p>
                            <p>
                                <Link href='#' passHref>
                                    <a className={style.footerItem1}>19522006@gm.uit.edu.vn</a>
                                </Link>
                            </p>

                        </div>
                    </Grid>
                    <Grid xl={3} lg={3} sm={6} md={6} item xs={12}>
                        <div>
                            <p className={style.footerTitle}>Phương thức thanh toán</p>
                            <p>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>Thanh toán khi nhân hàng</a>
                                </Link>
                            </p>
                            <p>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>Chuyển khoản qua ngân hàng</a>
                                </Link>
                            </p>
                        </div>
                    </Grid>
                    <Grid xl={3} lg={3} sm={6} md={6} item xs={12}>
                        <div>
                            <p className={style.footerTitle}>Thông tin</p>
                            <p>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>Từ khóa tìm kiếm</a>
                                </Link>
                            </p>
                            <p>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>Tìm kiếm nâng cao</a>
                                </Link>
                            </p>
                            <p>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>Về chúng tôi</a>
                                </Link>
                            </p>
                        </div>
                    </Grid>
                    <Grid xl={3} lg={3} sm={6} md={6} item xs={12}>
                        <div>
                            <p className={style.footerTitle}>Liên hệ</p>
                            <p style={{ display: 'flex' }}>
                                <GrLocation style={{ transform: 'translateY(+4px)' }} className={style.footerCustomIcon}></GrLocation>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>Trường đại học Công nghệ thông tin</a>
                                </Link>
                            </p>
                            <p style={{ display: 'flex' }}>
                                <HiOutlinePhone style={{ transform: 'translateY(+4px)' }} className={style.footerCustomIcon}></HiOutlinePhone>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>(+84) 9999999999</a>
                                </Link>
                            </p>
                            <p style={{ display: 'flex' }}>
                                <AiOutlineMail style={{ transform: 'translateY(+4px)' }} className={style.footerCustomIcon}></AiOutlineMail>
                                <Link href='#' passHref>
                                    <a className={style.footerItem}>1999999@gm.uit.edu.vn</a>
                                </Link>
                            </p>
                        </div>
                    </Grid>
                </Grid>
                <Grid style={{ marginBottom: '20px' }} container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <p style={{ fontSize: '.8rem', opacity: '36%', marginTop: '10px' }}>@ 2022 All rights Reservce</p>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src="/img/logo.png" alt=""
                                height='80px'
                                style={{ height: '80px' }}
                            />
                            <p style={{ fontSize: '1.6rem', fontWeight: '600', paddingLeft: '10px', marginTop: '12px' }}>GoodBook</p>
                        </div>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <BsTwitter className={style.customIconMedia}></BsTwitter>
                            <BsFacebook className={style.customIconMedia}></BsFacebook>
                            <BsInstagram className={style.customIconMedia}></BsInstagram>
                            <BsYoutube className={style.customIconMedia}></BsYoutube>

                            {/* <Link href='#' passHref>
                                <BsTwitter className={style.customIconMedia}></BsTwitter>
                            </Link>
                            <Link href='#' passHref>
                                <BsFacebook className={style.customIconMedia}></BsFacebook>
                            </Link>
                            <Link href='#' passHref>
                                <BsInstagram className={style.customIconMedia}></BsInstagram>
                            </Link>
                            <Link href='#' passHref>
                                <BsYoutube className={style.customIconMedia}></BsYoutube>
                            </Link> */}
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>

    )
}

export default Footer