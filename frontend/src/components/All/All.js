import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PrimaryHeading from '../../widgets/Heading/Heading';
import Card from '../../widgets/Card/Card';
import moment from 'moment';
import { checkStatus, getTodos } from '../../action';
import { useWarning } from '../../widgets/Warning/Warning';
import s from './All.module.scss';
import { IMAGE_URL } from '../../strings';
const PRIORITY = { high: '#3a3', moderate: '#f48c06', low: '#f04' };

const All = ({
    dispatch,
    statusReducer,
    getTodosReducer
}) => {
    const [warning, setWarning] = useWarning('');
    const [allTodos, setAllTodos] = useState([]);
    const { push } = useHistory();
    useEffect(() => {
        dispatch(checkStatus());
        dispatch(getTodos());
    }, []);
    useEffect(() => {
        if(statusReducer){
            const { success } = statusReducer;
            if(!success) push('/login');
        };
    }, [statusReducer]);
    useEffect(() => {
        if(getTodosReducer){
            console.log(getTodosReducer);
            const { success, message, todos } = getTodosReducer;
            if(!success) return setWarning(message);
            setAllTodos(todos);
        }
    }, [getTodosReducer]);

    return <Card className={[s.main, s.card].join(' ')}>
        <PrimaryHeading text='All Todos' />
        <div className={s.card_holder}>
            {
                allTodos.map(todo => {
                    let { id, expiresIn, file, body, title, priority } = todo;
                    return <section className={s.card_holder_item} key={id}>
                        <div className={s.card_holder_item_top}>
                            <span>{title}</span>
                            <span>
                                {expiresIn <= +Date.now() ? 'Expired ' : 'Expires '}
                                {moment(expiresIn).fromNow()}
                            </span>
                        </div>
                        <div className={s.card_holder_item_middle}>
                            <span style={{ background: PRIORITY[priority] }} />
                            <span>{priority}</span>
                            {file ? <a href={IMAGE_URL+file} target="_blank" rel="noopener noreferrer">View File</a> : <></>}
                        </div>
                        <p className={s.card_holder_item_bottom}>{body}</p>
                    </section>
                })
            }
        </div>
    </Card>
};

const matchStateToProps = (state = {}) => {
    const { statusReducer, getTodosReducer } = state;
    return { statusReducer, getTodosReducer };
};

export default connect(matchStateToProps)(All);