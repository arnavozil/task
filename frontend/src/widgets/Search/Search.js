import React, { useState, useEffect } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import PrimaryButton from '../Button/Button';
import Modal from 'react-modal';

import s from './Search.module.scss';
import { connect } from 'react-redux';
import { chatById } from '../../actions';
import { TypingDots } from '../Loader/Loader';
import Window from '../Window/Window';
import get from 'lodash/get';
import { MODAL_STYLES } from '../../styles';

const Search = ({
    dispatch,
    chatByIdReducer
}) => {
    Modal.setAppElement('#root');

    const [text, setText] = useState('');
    const [canLoad, setCanLoad] = useState(false);
    const [show, setShow] = useState(false);

    const sendToChat = id => {
        setCanLoad(true);
        dispatch(chatById({ id }));
    };
    
    useEffect(() => {
        console.log(chatByIdReducer);
        if(chatByIdReducer){
            setCanLoad(false);
            setText('');
            const { success, ...data } = chatByIdReducer;
            if(success) setShow(data);
        };
    }, [chatByIdReducer]);

    return <section className={s.main}>
        <input 
            className={s.main_input}
            value={text} 
            placeholder='Search Chats...'
            onChange={e => setText(e.target.value)}
        />
        <PrimaryButton 
            text={canLoad ? <TypingDots /> : <AiOutlineArrowRight />}
            className={s.main_button}
            onProceed={() => sendToChat(text)}
            clickable={Boolean(text)}
        />
        <Modal 
            isOpen={Boolean(show)}
            onRequestClose={() => setShow(false)}
        >
            <Window 
                readOnly messages={get(show, 'messages', [])}
                type='executive' style={MODAL_STYLES}
                header={`#${get(show, 'chat.referenceId','')}`}
            />
        </Modal>
    </section>
};

const matchStateToProps = (state = {}) => {
    const { chatByIdReducer } = state;
    return { chatByIdReducer };
};

export default connect(matchStateToProps)(Search);