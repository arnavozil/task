import React, { useState, useEffect } from 'react';
import s from './Login.module.scss';
import Form from '../../widgets/Form/Form';
import Card from '../../widgets/Card/Card';
import { connect } from 'react-redux';
import { checkStatus, loginUser } from '../../action';
import { useHistory } from 'react-router-dom';
import { useWarning } from '../../widgets/Warning/Warning';

const DEFAULT_CREDS = { username: '', password: '' };
const Login = ({
    dispatch, loginReducer, statusReducer
}) => {
    const { push } = useHistory();
    const [creds, setCreds] = useState(DEFAULT_CREDS);
    const [canSubmit, setCanSubmit] = useState(true);
    const [message, setMessage] = useWarning('');
    useEffect(() => dispatch(checkStatus()), []);
    const login = () => {
        setCanSubmit(false);
        dispatch(loginUser(creds));
    };
    useEffect(() => {
        if(statusReducer){
            const { success } = statusReducer;
            if(success) push('/add');
        };
    }, [statusReducer]);
    useEffect(() => {
        if(!loginReducer) return;
        setCanSubmit(true);
        const { success, message } = loginReducer;
        if(!success) return setMessage(message)
        push({ pathname: '/add'  });
        return () => dispatch({ type: 'LOGIN_USER', payload: null });
    }, [loginReducer]);


    return <Card className={s.main}>
        <Form 
            heading='Login' error={message} canSubmit={canSubmit}
            format={[
                {
                    type: 'text', uid: 'username', value: creds.username,
                    onChange: e => setCreds(c => ({ ...c, username: e.toLowerCase() })),
                    placeholder: 'username'
                },
                {
                    type: 'password', uid: 'pass', 
                    onChange: e => setCreds(c => ({ ...c, password: e })), 
                    value: creds.password, placeholder: 'Password'
                }
            ]} cta='Login' onSubmit={login}
        />
    </Card>
};

const matchStateToProps = (state = {}) => {
    const { loginReducer, statusReducer } = state;
    return { loginReducer, statusReducer };
};

export default connect(matchStateToProps)(Login);