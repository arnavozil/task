import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Heading.module.scss';

const PrimaryHeading = ({
    text = '',
    capital = true,
    className = '',
    onClick = () => {},
    ...props
}) => {

    return (
        <h1 
            onClick={onClick}
            className = {[s.main, className].join(' ')}
            style={{ textTransform: capital ? 'uppercase' : 'unset' }}
        >
            {text || props.children}
        </h1>
    )
};

export default PrimaryHeading;

export const LinkHeadingPlain = ({
    data = [],
    themeReducer: tr,
    ...props
}) => {

    return (
        <div className={[s.link, props.className].join(' ')}>
            {data.filter(Boolean).map((el, ind, arr) => {

                const { name, to } = el;
                return <NavLink 
                    key={name} 
                    className={[s.link_name, ind !== arr.length - 1 ? s.after : ''].join(' ')} 
                    to={to}
                >
                    {name}
                </NavLink>
            })}
        </div>
    )
};