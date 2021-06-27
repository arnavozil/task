import React from 'react';

import s from './Box.module.scss';

const DEFAULT_FORMAT = [
    { checked: false, color: '#f04', text: 'First', onClick: () => {} },
    { checked: false, color: '#f88', text: 'Second', onClick: () => {} },
    { checked: false, color: '#3a3', text: 'Third', onClick: () => {} }
]
const CheckBoxes = ({
    format = DEFAULT_FORMAT
}) => {
    return <div className={s.box}>
        {
            format.map(el => {
                const { checked, color, text, onClick } = el;
                return <section 
                    className={[s.box_item, checked ? s.selected : ''].join(' ')}
                    onClick={onClick}
                >
                    {color ? <span className={s.box_item_color} 
                        style={{background: color}}
                    /> : <></>}
                    <span className={s.box_item_text}>{text}</span>
                </section>  
            })
        }
    </div>
};

export default CheckBoxes;