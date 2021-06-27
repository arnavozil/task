import React from 'react';

import { LoadingDots } from '../Loader/Loader';
import TextInput from '../Input/Input';
import PrimaryHeading from '../Heading/Heading';
import s from './Form.module.scss';
import Warning from '../Warning/Warning';

const DEFAULT_FORMAT = [
    { type: 'text', uid: 'name', onChange: () => {}, value: '', placeholder: 'Name' },
    { type: 'password', uid: 'pass', onChange: () => {}, value: '', placeholder: 'Password' },
]
const Form = ({
    format = DEFAULT_FORMAT,
    perRow = 1, cta='Submit',
    onSubmit = () => {}, error = '',
    heading = '', canSubmit = true
}) => {

    perRow = Math.min(perRow, format.length);
    const submitForm = e => {
        e.preventDefault();
        if(canSubmit) onSubmit(e);
        return;
    };

    return <form className={s.form} onSubmit={submitForm}>
        <Warning text={error} />
        {heading ? <PrimaryHeading 
            text={heading}
            className={s.form_heading}
        /> : <></>}
        <div 
            className={s.form_main}
            style={{ gridTemplateColumns: `repeat(${perRow}, ${100 / perRow}%)` }}
        >
            {
                format.map(info => <TextInput 
                    {...info} key={info.uid}
                    containerClassName={s.form_main_input}
                />)
            }
        </div>
        <div
            className={s.form_button}
        >
            <input
                type='submit' value={canSubmit ? cta : ''} onClick={submitForm}
                className={[s.form_main_button, canSubmit ? '' : s.inactive].join(' ')}
            />
            {!canSubmit ? <LoadingDots 
                className={s.form_button_loading}
            /> : <></>}
        </div>
    </form>
};

export default Form;