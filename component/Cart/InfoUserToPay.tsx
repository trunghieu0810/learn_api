import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, RootStateOrAny, useSelector } from 'react-redux'

import { Container, Grid, TextField, Radio } from '@mui/material'
import style from '../../styles/Cart.module.css'
import axios from 'axios'
import Link from 'next/link';

function InfoUserToPay(props) {
    const infoUser = useSelector((state: RootStateOrAny) => state.userReducer.infoUser)
    const isLogin = useSelector((state: RootStateOrAny) => state.userReducer.isLogin)
    const cart = useSelector((state: RootStateOrAny) => state.cart)
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = React.useState('momo');
    const [infoReceipt, setInfoReceipt] = useState({
        district: '',
        province: '',
        commune: '',
        address: '',
        note: '',
        paymentMethod: '',
        phone: '',
        name: '',
    })
    const [provinces, setProvinces] = useState([])
    const [provinceSelect, setProvinceSelect] = useState<String | null>(infoUser.province ? infoUser.province : '0')

    const [districts, setDistricts] = useState([])
    const [districtSelect, setDistrictSelect] = useState<String | null>(infoUser.district ? infoUser.district : '0')

    const [communes, setCommunes] = useState([])
    const [communeSelect, setCommuneSelect] = useState<String | null>(infoUser.commune ? infoUser.commune : '0')

    

    useEffect(() => {
        setInfoReceipt(state => (
            {
                ...state,
                name: infoUser.name,
                phone: infoUser.phone,
            }
        ))
        const fetAPIProvince = async () => {
            axios.get(`https://api.mysupership.vn/v1/partner/areas/province`).then(res => {
                console.log(provinceSelect)
                setProvinces(res.data.results)
                res.data.results.forEach(value => {
                    if (value.code == provinceSelect) {
                        setInfoReceipt(state => (
                            {
                                ...state,
                                province: value.name    
                            }
                        ))
                    }
                })
            })
            if (provinceSelect !== '0') {
                await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${provinceSelect}`).then(res => {
                    setDistricts(res.data.results)
                    res.data.results.forEach(value => {
                        if (value.code == districtSelect) {
                            setInfoReceipt(state => (
                                {
                                    ...state,
                                    district: value.name    
                                }
                            ))
                        }
                    })
                })
            }
            if (districtSelect !== '0') {
                await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${districtSelect}`).then(res => {
                    setCommunes(res.data.results)
                    if(communeSelect !== '0') {
                        res.data.results.forEach(value => {
                            if (value.code == communeSelect) {
                                setInfoReceipt(state => (
                                    {
                                        ...state,
                                        commune: value.name    
                                    }
                                ))
                            }
                        })
                    }
                    
                })
            }
        }
        fetAPIProvince()
    }, [])


    const handleChangeMethoPay = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setInfoReceipt(state => (
            {
                ...state,
                paymentMethod: event.target.value,
            }
        ))
        setSelectedValue(event.target.value);
    }

    const controlProps = (item: string) => ({
        checked: selectedValue === item,
        onChange: handleChangeMethoPay,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    const handleChangeProvince = async (e) => {
        setInfoReceipt(state => ({
            ...state,
            province: e.target.selectedOptions[0].text
        }))
        setProvinceSelect(e.target.value)
        if (e.target.value == '0') {
            setDistricts([])
            setCommunes([])
        } else {
            await axios.get(`https://api.mysupership.vn/v1/partner/areas/district?province=${e.target.value}`).then(res => {
                setDistricts(res.data.results)
            })
        }
        setDistrictSelect('0')
        setCommuneSelect('0')
    }

    const handleChangeDistrict = async (e) => {
        setInfoReceipt(state => ({
            ...state,
            district: e.target.selectedOptions[0].text
        }))
        setDistrictSelect(e.target.value)
        if (e.target.value == '0') {
            setCommunes([])
        } else {
            await axios.get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${e.target.value}`).then(res => {
                setCommunes(res.data.results)
            })
        }
        setCommuneSelect('0')
    }

    const handleChangeCommune = (e) => {
        setInfoReceipt(state => ({
            ...state,
            commune: e.target.selectedOptions[0].text
        }))
        setCommuneSelect(e.target.value)
    }

    const handleClickPayment = (e) => {
        props.handleClickPayment(infoReceipt)
    }

    const renderTotal = (listCart) => {
        if (listCart.length == 0) {
          return 0
        }
        return listCart.reduce((total, value) => { return total += value.product?.price * value.quantity }, 0)
      }

    return (
        <div className={'p-4 relative'}>
            <div className={style.line}></div>
            <div className='flex justify-between items-center pt-10'>
                <div className='text-3xl font-bold'>Thông tin vận chuyển</div>
                {
                    isLogin ? null : (
                        <div className='text-base w-2/6'>Bạn đã có tài khoản?
                            <Link href={'/login'}>
                                <span className='cursor-pointer text-[#2f5acf] font-medium'>Đăng nhập ngay</span>
                            </Link>
                        </div>
                    )
                }
            </div>
            <Container className='pt-10'>
                <Grid container spacing={3}>
                    <Grid item sm={6}>
                        <TextField
                            label="Họ tên"
                            id="outlined-basic"
                            variant="outlined"
                            size="medium"
                            value={infoReceipt.name}
                            fullWidth
                            onChange={(e) => {
                                setInfoReceipt(state => (
                                    {
                                        ...state,
                                        name: e.target.value
                                    }
                                ))
                            }}
                            placeholder='Nguyễn Văn A'
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <TextField
                            label="Số điện thoại"
                            id="outlined-basic"
                            variant="outlined"
                            defaultValue={infoUser.phone ? infoUser.phone : ''}
                            size="medium"
                            fullWidth
                            onChange={(e) => {
                                setInfoReceipt(state => (
                                    {
                                        ...state,
                                        phone: e.target.value
                                    }
                                ))
                            }}
                            placeholder='0999999999'
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            label="Email"
                            id="outlined-basic"
                            variant="outlined"
                            size="medium"
                            disabled
                            defaultValue={infoUser.mail ? infoUser.mail : ''}
                            fullWidth
                            placeholder='abc@gmail.com'
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            label="Địa chỉ"
                            id="outlined-basic"
                            variant="outlined"
                            size="medium"
                            fullWidth
                            onChange={(e) => {
                                setInfoReceipt(state => (
                                    {
                                        ...state,
                                        address: e.target.value
                                    }
                                ))
                            }}
                            placeholder='43 QL91 (Số nhà)'
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            label="Tỉnh/TP"
                            name="province"
                            required
                            size='medium'
                            variant="outlined"
                            select
                            value={provinceSelect}
                            onChange={handleChangeProvince}
                            onClick={handleChangeProvince}
                            defaultValue={"0"}
                            SelectProps={{ native: true }}
                        >
                            <option value="0">
                                --Chọn Tỉnh/TP--
                            </option>
                            {provinces.map((province, index) => (
                                <option key={index} results={province.name} value={province.code}>
                                    {province.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            label="Quận/Huyện"
                            name="district"
                            required
                            size='medium'
                            variant="outlined"
                            select
                            value={districtSelect}
                            onChange={handleChangeDistrict}
                            SelectProps={{ native: true }}
                        >
                            <option value="0">
                                --Chọn Quận/Huyện--
                            </option>
                            {districts.map((district, index) => (
                                <option key={index} value={district.code}>
                                    {district.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item sm={4}>
                        <TextField
                            fullWidth
                            label="Xã/Phường"
                            name="commune"
                            required
                            size='medium'
                            variant="outlined"
                            select
                            value={communeSelect}
                            onChange={handleChangeCommune}
                            onLoadedData={() => {console.log('commune')}}
                            SelectProps={{ native: true }}
                        >
                            <option value="0">
                                --Chọn Xã/Phường--
                            </option>
                            {communes.map((commune, index) => (
                                <option key={index} value={commune.code}>
                                    {commune.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            label="Ghi chú thêm"
                            id="outlined-basic"
                            variant="outlined"
                            size="medium"
                            onChange={(e) => {
                                setInfoReceipt(state => (
                                    {
                                        ...state,
                                        note: e.target.value
                                    }
                                ))
                            }}
                            fullWidth
                            placeholder='Ghi chú thêm (Ví dụ: Giao giờ hành chính)'
                        />
                    </Grid>
                </Grid>
            </Container>
            <div className='pt-14 text-3xl font-bold'>Hình thức thanh toán</div>
            <div className='p-4'>
                {/* Momoo */}
                <div className={selectedValue === 'Momo' ? style.paymentActive + ' transition duration-300 ease-out cursor-pointer flex rounded-md items-center h-16 mb-6 ' + ' ' + style.payment : ' transition duration-300 ease-out cursor-pointer flex rounded-md items-center h-16 mb-6 ' + ' ' + style.payment} >
                    <Radio
                        id='radioMethodPay1'
                        name='payment-method'
                        {...controlProps('Momo')}
                        sx={{
                            color: '#bdbdbd',
                            '&.Mui-checked': {
                                color: '#00bfa5',
                            },
                        }}
                    />
                    <label className='flex items-center' htmlFor="radioMethodPay">
                        <img className='mx-3' height={'35px'} width={'35px'} src='/img/momo-icon.png'></img>
                        <div className='ml-2 font-medium '>Thanh toán bằng momo</div>
                    </label>
                </div>
                {/* COD */}
                <div className={selectedValue === 'Cod' ? style.paymentActive + ' transition duration-300 ease-out cursor-pointer flex rounded-md items-center h-16 mb-6 ' + ' ' + style.payment : ' transition duration-300 ease-out cursor-pointer flex rounded-md items-center h-16 mb-6 ' + ' ' + style.payment}  >
                    <Radio
                        name='payment-method'
                        id='radioMethodPay2'
                        {...controlProps('Cod')}
                        sx={{
                            color: '#bdbdbd',
                            '&.Mui-checked': {
                                color: '#00bfa5',
                            },
                        }}
                    />
                    <label className='flex items-center' htmlFor="radioMethodPay2">
                        <img className='mx-3' height={'35px'} width={'35px'} src='/img/cod-icon.png'></img>
                        <div className='ml-2'>
                            <div className='font-medium'>COD</div>
                            <div>Thanh toán khi nhận hàng</div>
                        </div>
                    </label>
                </div>
                {/* ZAlo pay */}
                <div className={selectedValue === 'ZaloPay' ? style.paymentActive + ' transition duration-300 ease-out cursor-pointer flex rounded-md items-center h-16 mb-6 ' + ' ' + style.payment : ' transition duration-300 ease-out cursor-pointer flex rounded-md items-center h-16 mb-6 ' + ' ' + style.payment}  >
                    <Radio
                        name='payment-method'
                        id='radioMethodPay3'
                        {...controlProps('ZaloPay')}
                        sx={{
                            color: '#bdbdbd',
                            '&.Mui-checked': {
                                color: '#00bfa5',
                            },
                        }}
                    />
                    <label className='flex items-center' htmlFor="radioMethodPay3">
                        <img className='mx-3' height={'35px'} width={'35px'} src='/img/zalopay-icon.jpg'></img>
                        <div className='ml-2 font-medium'>Ví điện tử ZaloPay</div>
                    </label>
                </div>
                {/* Xu  */}
                <div className={selectedValue === 'Diamond' ? style.paymentActive + ' transition duration-300 ease-out cursor-pointer flex rounded-md items-center h-16 mb-6 ' + ' ' + style.payment : ' transition duration-300 ease-out cursor-pointer flex rounded-md items-center h-16 mb-6 ' + ' ' + style.payment} >
                    <Radio
                        name='payment-method'
                        id='radioMethodPay4'
                        {...controlProps('Diamond')}
                        sx={{
                            color: '#bdbdbd',
                            '&.Mui-checked': {
                                color: '#00bfa5',
                            },
                        }}
                    />
                    <label className='flex items-center' htmlFor="radioMethodPay4">
                        <img className='mx-3' height={'35px'} width={'35px'} src='/img/kimcuong-icon.png'></img>
                        <div className='ml-2 font-medium'>Thanh toán bằng kim cương</div>
                    </label>
                </div>
                <div className='mb-6'>Nếu bạn không hài lòng với sản phẩm của chúng tôi? Bạn hoàn toàn có thể trả lại sản phẩm. Tìm hiểu thêm
                    <Link href={'/cart/policy'} passHref>
                        <span className='cursor-pointer font-bold'> tại đây.</span>
                    </Link>
                </div>
                <div onClick={handleClickPayment} className={'transition duration-300 ease-out cursor-pointer py-4 flex justify-center w-ful bg-black text-white rounded-lg' + ' ' + style.btnPay}>
                    Thanh toán {renderTotal(cart.cart) > 1000000 ? renderTotal(cart.cart).toLocaleString() : (25000 + renderTotal(cart.cart)).toLocaleString()}k (Momo)
                </div>
            </div>
        </div>
    );
}

export default InfoUserToPay;