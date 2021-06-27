import React, { useEffect } from 'react';
import logo from '../../assets/logo.png';
import s from './Splash.module.scss';
import { LoadingBoxes } from '../../widgets/Loader/Loader';
import { connect } from 'react-redux';
import { checkStatus } from '../../action';
import { useHistory } from 'react-router-dom';

const Splash = ({
    dispatch, statusReducer
}) => {
    const { push } = useHistory();
    useEffect(() => {
        dispatch(checkStatus());
    }, []);

    useEffect(() => {
        if(statusReducer){
            const { success } = statusReducer;
            setTimeout(() => {
                push(success ? '/add' : '/login');
            }, 3000);
        };
    }, [statusReducer]);

    return <main className={s.main}>
        <LoadingBoxes show />
        <img 
            alt='Revinfotech Task' src={logo}
            className={s.main_image}
        />
    </main>;
};

const matchStateToProps = (state = {}) => {
    const { statusReducer } = state;
    return { statusReducer };
}

export default connect(matchStateToProps)(Splash);