import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import PrimaryButton from '../Button/Button';
import Card from '../Card/Card';
import TextInput from '../Input/Input';
import { v4 } from 'uuid';
import { IoMdSend } from 'react-icons/io';

import PrimaryHeading from '../Heading/Heading';
import s from './Window.module.scss';
import { Board } from '../Box/Box';
import moment from 'moment';
import { LoadingBoxes, TypingDots } from '../Loader/Loader';
import { MdCallEnd } from 'react-icons/md';
import { useKeyEffect } from '../../hooks';

const Window = ({
    messages = [], readOnly = false,
    message = '', canEnd, request = '',
    onSend = () => {}, otherTyping = false,
    setMessage = () => {}, endedText='Chat Ended',
    onEnd = () => {}, type = 'user',
    isAlive = true, canReview,
    onReview = () => {}, canLoad = false,
    initiator = '', className = '',
    endClassName = '', header='', hideLoading,
}) => {
    useKeyEffect(() => {
        if(message) onSend(message, v4());
    });
    const Message = ({ message: m }) => {
        
        return <div style={{
            justifyContent: m.by === 'admin' ? 'center' : type === m.by ? 'flex-end' : 'flex-start',
            margin: m.by === 'admin' ? '1rem auto' : '',
        }} className={s.card_scroll_container}>
            <section style={{
                background: m.by === 'admin' ? '#100' : '',
                alignItems: m.by === 'admin' ? 'center' : type === m.by ? 'flex-end' : 'flex-start',    
            }} className={s.card_scroll_item}>
                {m.by !== 'admin' ? <div 
                    className={s.card_scroll_item_top}
                    style={type !== m.by ? { flexDirection: 'row' } : {}}
                >
                    <span className={s.card_scroll_item_top_name}>{type === m.by ? 'You' : m.by}</span>
                    <span className={s.card_scroll_item_time}>
                        {moment(m.createdAt).format('DD-MMM, HH:MM A')}
                    </span>
                </div> : <></>}
                <span className={s.card_scroll_item_text}>{m.content}</span>
                {m.by === 'admin' ? <span className={s.card_scroll_item_time}>
                    {moment(m.createdAt).format('DD-MMM, HH:MM A')}
                </span> : <></>}
            </section>
        </div>
    };

    return <Card className={[s.main_card, s.card, className].join(' ')}>
        {(canEnd) ? <PrimaryButton 
            clickable={isAlive}
            text={isAlive ? <MdCallEnd /> : endedText}
            onProceed={onEnd}
            className={[s.card_end, endClassName].join(' ')}
        /> : <></>}
        {header ? <PrimaryHeading text={header} className={s.card_heading} /> : <></>}
        <ScrollToBottom 
            className={s.card_scroll}
            behavior='smooth'
        >
            {(canLoad && initiator && isAlive) ? <Message message={{
                by: 'admin', createdAt: +new Date(), content: initiator
            }} /> : <></>}
            {messages.map(m => <Message message={m} key={m.clientId} />)}
            {otherTyping ? <section className={s.card_scroll_container}>
                <div className={s.card_scroll_item}><TypingDots /></div>
            </section> : <></>}
        </ScrollToBottom>
        <LoadingBoxes show={canLoad && isAlive && !hideLoading} />
        <TextInput 
            value={message} placeholder='Type a message...'
            containerClassName={s.card_input}
            onChange={setMessage} readOnly={readOnly || (type === 'user' && !isAlive)}
        >
            <PrimaryButton 
                text={<IoMdSend />} className={s.card_input_button}
                onProceed={() => onSend(message, v4())}
                clickable={!!message}
            >
            </PrimaryButton>
        </TextInput>
        {request ? <div className={s.request}>{request}</div> : <></>}
        {(canReview && !isAlive) ? <Board onSubmit={i => onReview(i)} /> : <></>}
    </Card>
};

export default Window;