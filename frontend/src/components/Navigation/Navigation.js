import React, { useEffect, useState } from 'react';
import s from './Navigation.module.scss';
import logo from '../../assets/logo.png';
import { connect } from 'react-redux';
import { useLocation, NavLink, useHistory } from 'react-router-dom';
import { checkStatus, logoutUser } from '../../action';

const Navigation = ({
    dispatch, statusReducer, logoutReducer
}) => {
    const { pathname } = useLocation();
    const { replace } = useHistory();
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => dispatch(checkStatus()), []);
    useEffect(() => {
        if(statusReducer){
            const { success } = statusReducer;
            setIsAuth(success);
        };
    }, [statusReducer]);
    useEffect(() => {
        if(logoutReducer) replace('/');
        return () => ({ payload: null, type: 'LOGOUT_USER' })
    }, [logoutReducer]);
    return <nav style={{ opacity: pathname === '/' ? '0' : '' }} className={s.main}>
        <img 
            alt='Revinfotech'
            src={logo}
            className={s.main_logo}
        />
        <div className={s.main_right}>
            {isAuth ? <>
                <NavLink to='/add'>Add</NavLink>
                <NavLink to='/all'>All</NavLink>
                <span onClick={() => dispatch(logoutUser())}>Logout</span>
            </> : <>
                <NavLink to='/register'>Signup</NavLink>
                <NavLink to='/login'>Login</NavLink>
            </>}
        </div>
    </nav>
};

const matchStateToProps = (state = {}) => {
    const { statusReducer, logoutReducer } = state;
    return { statusReducer, logoutReducer };
};


export default connect(matchStateToProps)(Navigation);