import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Auth = () => {
    const { pathname } = useLocation();
    return <>
        {pathname === '/login' ? <Login /> : <></> }
        {pathname === '/register' ? <Register /> : <></> }
    </>;
};

export default Auth;