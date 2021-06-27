import React, { useState, useEffect } from 'react';
import s from './Register.module.scss';
import Form from '../../widgets/Form/Form';
import Card from '../../widgets/Card/Card';
import { connect } from 'react-redux';
import { checkStatus, createUser } from '../../action';
import { useHistory } from 'react-router-dom';
import { useWarning } from '../../widgets/Warning/Warning';

const DEFAULT_CREDS = { username: '', password: '' };
const Register = ({
    dispatch, registerReducer, statusReducer
}) => {
    const { push } = useHistory();
    const [creds, setCreds] = useState(DEFAULT_CREDS);
    const [canSubmit, setCanSubmit] = useState(true);
    const [message, setMessage] = useWarning('');
    const create = () => {
        setCanSubmit(false);
        dispatch(createUser(creds))
    };
    useEffect(() => dispatch(checkStatus()), []);
    useEffect(() => {
        if(statusReducer){
            const { success } = statusReducer;
            if(success) push('/add');
        };
    }, [statusReducer]);
    useEffect(() => {
        if(!registerReducer) return;
        setCanSubmit(true);
        const { success, message } = registerReducer;
        if(!success) return setMessage(message)
        push({ pathname: '/add' });
        return () => dispatch({ type: 'CREATE_USER', payload: null });
    }, [registerReducer]);


    return <Card className={s.main}>
        <Form 
            heading='Register' error={message} canSubmit={canSubmit}
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
            ]} cta='Signup' onSubmit={create}
        />
    </Card>
};

const matchStateToProps = (state = {}) => {
    const { registerReducer, statusReducer } = state;
    return { registerReducer, statusReducer };
};

export default connect(matchStateToProps)(Register);