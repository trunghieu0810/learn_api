import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'
import style from '../styles/Alert.module.css'
import { hideAlert } from '../redux/actions/alertAction'

function AlertGoodBook(props) {
    const dispatch = useDispatch();
    const alertReducer = useSelector((state: RootStateOrAny) => state.alertReducer)
    useEffect(() => {
        let timer 
        if (alertReducer.isShow) {
             timer = setTimeout(() => {
                dispatch(hideAlert())
            }, 2000)
        }
        return () => clearTimeout(timer)
    }, [alertReducer])
    const handleClick = () => {
        dispatch(hideAlert())
    }

    return (
        <div onClick={handleClick} className={ !alertReducer.isShow ? style.hideAlert : null} style={{ zIndex:'100',transition: 'all 1s ease-in-out', position: 'fixed', right: '40px', top: '40px', boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px', cursor: 'pointer' }}>
            <Alert severity={alertReducer.type}>
                <AlertTitle>{alertReducer.message}</AlertTitle>
            </Alert>
        </div>
    );
}

export default AlertGoodBook;