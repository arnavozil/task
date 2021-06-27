import React from 'react';
import s from './Loader.module.scss';

export const LoadingDots = ({ className }) => <div className={[s.collison, className].join(' ')} />;

export const LoadingBoxes = ({ className, show }) => show ? <div className={[s.loader, s.more, className].join(' ')} /> : <></>;

export const TypingDots = () => <div className={s.wave}>
    <span className={s.dot} />
    <span className={s.dot} />
    <span className={s.dot} />
</div>;