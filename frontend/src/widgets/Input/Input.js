import React from 'react';

import s from './Input.module.scss';

const TextInput = ({
    value = '',
    onChange = () => {},
    placeholder = 'Search...',
    type = 'text',
    containerClassName = '',
    inputClassName = '',
    uid = '',
    required = true,
    children,
    onBlur, onFocus,
    readOnly = false
}) => {

    return(
        <div className = {[s.textinput, containerClassName].join(' ')}>
            {(uid && value) ? <label className = {s.textinput_label} htmlFor = {uid}>
                {placeholder}
            </label> : <></>}
            <input 
                onBlur={onBlur}
                name = {uid}
                id = {uid} readOnly={readOnly}
                value = {value}
                onChange = {e => onChange(e.target.value)}
                className = {[s.textinput_input, inputClassName, readOnly ? s.readOnly : ''].join(' ')}
                type = {type} onFocus={onFocus}
                placeholder = {!readOnly ? placeholder : ''}
                required = {required}
            />
            {children}
        </div>
    )

};

export default TextInput;

export const TextArea = ({
    value = '',
    onChange = () => {},
    placeholder = 'Search...',
    type = 'text',
    containerClassName = '',
    inputClassName = '',
    uid = '',
    required = true,
    children,
    onBlur, onFocus,
    readOnly = false
}) => {
    return(
        <div className = {[s.textinput, containerClassName].join(' ')}>
            {(uid && value) ? <label className = {s.textinput_label} htmlFor = {uid}>
                {placeholder}
            </label> : <></>}
            <textarea
                onBlur={onBlur}
                name = {uid}
                id = {uid} readOnly={readOnly}
                value = {value}
                rows={10}
                onChange = {e => onChange(e.target.value)}
                className = {[s.textinput_input, inputClassName, readOnly ? s.readOnly : ''].join(' ')}
                type = {type} onFocus={onFocus}
                placeholder = {!readOnly ? placeholder : ''}
                required = {required}
            />
            {children}
        </div>
    )

};
