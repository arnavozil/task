import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { CARD_DARK_STYLES } from '../../styles';
import PrimaryHeading from '../Heading/Heading';

import s from './Compare.module.scss';
const PALLETE = ['#0071e3', '#2AFC98', '#f07167', '#eec584', '#0081a7', '#00afb9', '#fe5e41', '#35ff69', '#321325', '#5f04f0', '#9a031e', '#cb793a', '#fcdc4d', '#84a07c', '#e6f14a', '#cacaaa'];

const Compare = ({
    max,
    A = 50,
    B = 40,
    labelA = '',
    labelB = '',
    heading = '',
    tr
}) => {

    return <div style={tr === 'dark' ? CARD_DARK_STYLES : {}}>
        {heading ? <PrimaryHeading text={heading} className={s.heading} /> : <></>}
        <div className={s.main}>
            <section
                className={[s.main_back, s.a].join(' ')} 
                style={{left: 0, width: `${A / (max || A + B) * 100}%`}}
            />
            <section
                className={[s.main_back, s.b].join(' ')} 
                style={{left: `${A / (max || A + B) * 100}%`, width: `${B / (max || A + B) * 100}%`}}
            />
        </div>
        <div className={s.text}>
            {A ? <span className={s.text_words}>{(labelA ? `${labelA}: ` : '') + A}</span> : <></>}
            {B ? <span className={s.text_words}>{(labelB ? `${labelB}: ` : '') + B}</span> : <></>}
        </div>
    </div>
};

const matchStateToProps = (state = {}) => {
    const { themeReducer: tr } = state;
    return { tr };
};

export default connect(matchStateToProps)(Compare);


const MultiComparePlain = ({
    max = 100,
    data = [],
    heading = '',
    rightLabel = '',
    leftLabel = '',
    refer = null,
    customTip = false,
    tr
}) => {

    return <div style={tr === 'dark' ? CARD_DARK_STYLES : {}} ref={refer}>
        {heading ? <PrimaryHeading text={heading} className={s.heading} /> : <></>}
        <div className={s.main}>
            
            {data.map((el, ind) => {
                return <section 
                    key={ind}
                    className={s.main_back}
                    style={{
                        left: `${el.left}%`, 
                        width: `${el.width}%`, 
                        cursor: 'pointer',
                        borderRadius: ind === 0 ? '.15rem 0 0 .15rem' : ind === data.length - 1 ? '0 .15rem .15rem 0' : '',
                        backgroundColor: PALLETE[ind % PALLETE.length] 
                    }}
                    data-tip={!customTip ? `${+el.amount.toFixed(2)} on ${moment(el.date).format('DD/MMM/yyyy')}` : el?.tip}
                />
            })}
        </div>
        <div className={s.text}>
            {leftLabel ? <span>{leftLabel}</span> : <></>}
            {rightLabel ? <span>{rightLabel}</span> : <></>}
        </div>
        <ReactTooltip multiline type='dark' effect='solid' />
    </div>
}

export const MultiCompare = connect(matchStateToProps)(MultiComparePlain);