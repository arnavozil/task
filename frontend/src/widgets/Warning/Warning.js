import React, { useEffect, useState } from 'react';

import s from './Warning.module.scss';

export const useWarning = error => {
    const [message, setMessage] = useState(error);
    useEffect(() => {
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, 4000);
    }, [message]);
    return [message, setMessage];
}

const Warning = ({ text, className = '' }) => text ? <p className={[s.main, className].join(' ')}>
    {text}
</p> : <></>;

export default Warning;
        