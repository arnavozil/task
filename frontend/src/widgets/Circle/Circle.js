import React, { useState } from 'react';
import { useTimeout } from '../../hooks';

import s from './Circle.module.scss';

const Circle = ({
    duration = 30,
    className = '',
    isAlive = true,
    setRequest,
}) => {

    const [show, setShow] = useState(true);
    const [warning, setWarning] = useState('');
    useTimeout([
        { time: 0, action: () => setWarning('We are searching executives for you.') },
        { time: duration * 500, action: () => setWarning('This is taking longer than usual. Please hang there.') },
        { time: duration * 1000, action: () => {
                setWarning('We are sorry, we cannot connect you to any executive right now.');
                setShow(false);
                setRequest('All of our chat executives are busy with client queries. Please leave your name, contact and query here and we will contact you real soon.');
            },
        },
    ]);

    if(!isAlive) return <></>;

    return <section className={s.main}>
        {show ? <svg width="16" className={[s.main_svg, className].join(' ')} height="16">
            <circle className="bg" 
                cx="8" cy="8" r="6"
                fill="none" stroke="#efd"   
                strokeWidth="3"
                strokeDasharray="500"
            />
            <circle id="my-circle" className="fill" 
                cx="8" cy="8" r="6"
                fill="none" stroke="#0071e3"   
                strokeWidth="3"
                strokeDasharray="40"
            />
            
            <animate 
                xlinkHref="#my-circle"
                attributeName="stroke-dashoffset"
                from="40" to="0" 
                dur={duration} repeatCount="indefinite"
            />
        </svg> : <></>}
        <p className={s.main_text}>
            {warning}
        </p>
    </section>
};

export default Circle;