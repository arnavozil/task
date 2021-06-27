import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '../../widgets/Card/Card';
import { useHistory } from 'react-router-dom';
import { addTodo, checkStatus } from '../../action';
import AddUI from './UI';
import { useWarning } from '../../widgets/Warning/Warning';
import PrimaryHeading from '../../widgets/Heading/Heading';
import s from './Add.module.scss';

const DEFAULT_DATA = {
    title: '', body: '', expiresIn: '10',
    priority: 'moderate', file: null,
    fileName: '', unit: 'day', imageArr: []
};
const Add = ({
    dispatch, 
    statusReducer,
    addTodoReducer
}) => {
    const [positive, setPositive] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);
    const { push } = useHistory();
    const [warning, setWarning] = useWarning('');
    const [data, setData] = useState(DEFAULT_DATA);
    useEffect(() => {
        dispatch(checkStatus());
    }, []);

    useEffect(() => {
        if(statusReducer){
            const { success } = statusReducer;
            if(!success) push('/login');
        };
    }, [statusReducer]);

    const onSubmit = e => {
        setPositive(false);
        e.preventDefault();
        dispatch(addTodo(data));
        setCanSubmit(false);
    };

    useEffect(() => {
        if(addTodoReducer){
            setCanSubmit(true);
            const { success, message } = addTodoReducer;
            if(!success) return setWarning(message);
            setWarning(message);
            setPositive(true);
            setData(DEFAULT_DATA);
        };
        return () => dispatch({ type: 'ADD_TODO', payload: false });
    }, [addTodoReducer]);

    return <Card className={[s.main, s.card].join(' ')}>
        <PrimaryHeading text='Add Todo' />
        <AddUI 
            data={data} setter={setData} 
            submitForm={onSubmit}
            error={warning}
            canSubmit={canSubmit}
            positive={positive}
        />
    </Card>;
};

const matchStateToProps = (state = {}) => {
    const { statusReducer, addTodoReducer } = state;
    return { statusReducer, addTodoReducer };
}

export default connect(matchStateToProps)(Add);