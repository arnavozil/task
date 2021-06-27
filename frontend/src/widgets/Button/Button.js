import React from 'react';

import s from './Button.module.scss';

const PrimaryButton = ({
    text = 'Submit',
    clickable = true,
    onProceed = () => {},
    className = '',
    secondary = false,
    children = (<></>),
    tip = '',
    type = '',
    ...props
}) => {

    const handleClick = () => {

        if(!clickable){
            return;
        };

        onProceed();
    };

    const decideClass = !secondary ? s.primarybutton : s.secondarybutton;
    return (

        <div
            data-tip={tip} 
            style = {!clickable ? { cursor: 'not-allowed', background: '#aaa' } : {}}
            onClick = {handleClick}
            className = {[decideClass, className].join(' ')}
            {...props}
            type='button'
        >
            {text}
            {children}
        </div>
    );
};

export default PrimaryButton;
