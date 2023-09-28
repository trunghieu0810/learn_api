import React, { useState, useEffect } from 'react';
import { Grid, Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { AiOutlineMail, AiFillEdit } from 'react-icons/ai'
import { BsTelephone, BsGenderAmbiguous } from 'react-icons/bs'
import { CgUserList } from 'react-icons/cg'
import { FaBirthdayCake } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import axios from 'axios';
import { showAlertSuccess, showAlertError } from '../../redux/actions/alertAction';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { getAccessToken, setAccessToken } from '../../utils/cookies'
import { updateInfoUser } from '../../redux/actions/userAction';
import * as URL from '../../services/api/config'

const ModalEditUser = dynamic(() => import('../../component/Profile/ModalEditUser'))

const ProfileDetail = (props) => {
    const dispatch = useDispatch()
    const infoUser = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const [isShow, setIsShow] = useState(false)
    const [address, setAddress] = useState('')
   
    
    
    useEffect(() => {
        const fetchApi = async () => {
            setAddress('');
            await axios.get(`https://api.mysupership.vn/v1/partner/areas/province`).then(res => {
                res.data.results.forEach(value => {
                    if (value.code === infoUser.province) {
                        setAddress(value.name)
                    }
                })
            })
            await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${infoUser.province}`).then(res => {
                res.data.results.forEach(value => {
                    if (value.code === infoUser.district) {
                        setAddress(state => value.name + ', ' + state)
                    }
                })
            })

            await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${infoUser.district}`).then(res => {
                res.data.results.forEach(value => {
                    if (value.code === infoUser.commune) {
                        setAddress(state => value.name + ', ' + state)
                    }
                })
            })
        }
        fetchApi()
    }, [infoUser])


    const handleChangeHideModal = () => {
        setIsShow(false);
    }
    const handleChangeShowModal = () => {
        setIsShow(true);
    }


    const handleChangeImg = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
        } else {
            const formData = new FormData();
            formData.append("file", fileChangeEvent.target.files[0])
            formData.append("upload_preset", "qqqhcaa3");
            axios.post(`https://api.cloudinary.com/v1_1/databaseimg/image/upload`, formData)
                .then(res => {
                    console.log(res.data.url);
                    axios.post(URL.URL_UPDATE_AVATAR, {
                        token: getAccessToken(),
                        username: infoUser.username,
                        avatar: res.data.url
                    }).then(result => {
                        if (result.data.status == 1) {
                            dispatch(updateInfoUser(result.data.data))
                            dispatch(showAlertSuccess(result.data.message))
                            setAccessToken(result.data.token)
                        } else {
                            dispatch(showAlertError(result.data.message))
                        }
                    }).catch(err => {
                        dispatch(showAlertError('Lỗi hệ thống'))
                    })

                })
                .catch(err => {
                    dispatch(showAlertSuccess('Lỗi hệ thống'))
                })
        }
    }

    const renderGender = () => {
        if (infoUser.gender == 'male') {
            return 'Nam'
        } else if (infoUser.gender == 'female') {
            return 'Nữ'
        } else {
            return 'No gender'
        }
    }

    const renderBirthday = () => {
        let birthday = new Date(infoUser.birthday)
        return birthday.getDate() + '/' + (birthday.getMonth() + 1) + '/' + birthday.getFullYear()
    }

    return (
        <div className='rounded-lg ' style={{ boxShadow: 'rgb(0 0 0 / 60%) 0px 3px 8px', padding: '36px' }}>
            {isShow ? <ModalEditUser handleChangeHideModal={handleChangeHideModal}></ModalEditUser> : (
                null
            )}
            <Grid container>
                <Grid item md={5} sm={12} xs={12}>
                    <div className='items-end ' style={{ display: 'flex' }}>
                        <Grid container>
                            <Grid className='flex items-center justify-center' item md={5} sm={12} xs={12}>
                                <label htmlFor='profile-header-update-avatar'>
                                    <Avatar className='cursor-pointer border-solid border-1 border-[#2BBCBA]' src={infoUser.avatar} style={{ height: '140px', width: '140px' }} sx={{ bgcolor: deepOrange[500] }}>NONE</Avatar>
                                </label>
                                <input id="profile-header-update-avatar" type="file" style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={(e) => handleChangeImg(e)}></input>
                            </Grid>
                            <Grid className='flex items-end ml-6' item md={5} sm={12} xs={12}>
                                <div >
                                    <div className='font-sans text-xl font-bold pb-3'>{infoUser.name ? infoUser.name : 'No name'}</div>
                                    <div className='font-sans text-base pb-2'>Thành viên bạc</div>
                                    <div className='items-center mt-1 flex' >
                                        <AiOutlineMail className='mr-3.5 text-xl'></AiOutlineMail>
                                        <span className='overflow-hidden'>{infoUser.mail ? infoUser.mail : 'No mail'}</span>
                                    </div>
                                    <div className='items-center mt-1 flex' >
                                        <BsTelephone className='mr-3.5 text-xl'></BsTelephone>
                                        <span>{infoUser.phone ? infoUser.phone : 'No phone'}</span>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item md={2} sm={12} xs={12}>
                    <div className='items-end h-full' style={{ display: 'flex' }}>
                        <div className='ml-6'>
                            <div className='mt-3.5 items-center' style={{ display: 'flex' }}>
                                <CgUserList className='mr-3.5 text-xl'></CgUserList>
                                <span>{infoUser.username?.includes('googleId') ? "Google Account" : infoUser.username}</span>
                            </div>
                            <div className='items-center mt-1 ' style={{ display: 'flex' }}>
                                <FaBirthdayCake className='mr-3.5 text-xl'></FaBirthdayCake>
                                <span>{infoUser.birthday ? renderBirthday() : 'No birthday'}</span>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item md={5} sm={12} xs={12}>
                    <div className='h-full flex justify-between'>
                        <div className='items-end' style={{ display: 'flex' }}>
                            <div className='ml-6'>
                                <div className='mt-3.5 items-center' style={{ display: 'flex' }}>
                                    <HiOutlineLocationMarker className='mr-3.5 text-xl'></HiOutlineLocationMarker>
                                    <span>{address}</span>
                                </div>
                                <div className='items-center mt-1' style={{ display: 'flex' }}>
                                    <BsGenderAmbiguous className='mr-3.5 text-xl'></BsGenderAmbiguous>
                                    <span>{renderGender()}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <AiFillEdit onClick={handleChangeShowModal} className='text-2xl cursor-pointer hover:opacity-80'></AiFillEdit>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProfileDetail