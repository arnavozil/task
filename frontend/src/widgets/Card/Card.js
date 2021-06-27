import React from 'react';

import s from './Card.module.scss';

const Card = ({
    className = '',
    children
}) => {

    return <section
        className={[s.main, className].join(' ')}
    >
        {children}
    </section>
};

export default Card;