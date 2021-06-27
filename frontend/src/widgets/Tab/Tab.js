import React from 'react';

import s from './Tab.module.scss';

const TwinTab = ({
    setter = () => {},
    curr = 0,
    A = '', B = '',
    forDesktop, badgeA = ''
}) => {
    
    return <section style={forDesktop ? {display: 'flex'} : {}} className={s.main}>
        <span 
            onClick={() => setter(0)} 
            className={s.main_tab} 
            style={!curr ? { color: '#fff', background: '#0071e3' } : {}}
        >
            {A}
            {Boolean(badgeA) ? <span className={s.main_tab_badge}>
                {badgeA}
            </span> : <></>}
        </span>
        <span style={{flex: .05}} />
        <span 
            onClick={() => setter(1)} 
            className={s.main_tab} 
            style={curr ? { color: '#fff', background: '#0071e3' } : {}}
        >
            {B}
        </span>
    </section>
};

export default TwinTab;