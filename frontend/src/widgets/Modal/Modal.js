import React from 'react';
import { MdClose } from 'react-icons/md';
import ReactModal from 'react-modal';

import s from './Modal.module.scss';

const Modal = ({
    show, onClose, 
    children, style,
}) => {
    ReactModal.defaultStyles.overlay.backgroundColor = '#fff8dcaa';
    ReactModal.setAppElement('#root');

    return <ReactModal style={style} isOpen={show} onRequestClose={onClose} className={s.main}>
        <MdClose className={s.main_close} onClick={onClose} />
        {children}
    </ReactModal>
};

export default Modal;