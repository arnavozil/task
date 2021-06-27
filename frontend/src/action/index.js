import axio from 'axios';

let BASE = "http://localhost:5000";
if(process.env.NODE_ENV !== 'development'){
    BASE = "API_URL";
};

const axios = axio.create({
    withCredentials: true
})

const simpleRequest = ({
    method = 'post', body = {},
    url = '', type = '',
}) => async dispatch => {  
    const config = {
        method,
        url: `${BASE}/${url}`,
        data: body,
        headers: { 
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await axios(config);
        const payload = response.data;
        dispatch({
            type,
            payload: {
                ...payload,
                success: true
            }
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type,
            payload: {
                success: false,
                ...err?.response?.data
            }
        });
    };
};

const simpleFormRequest = ({
    body = {}, fileKey = 'file', 
    files, url = '', type = '',
    fileName = '',
}) => async dispatch => {
    const formData = new FormData();

    for(const key in body){
        formData.append(key, body[key]);
    }

    for(let i = 0; i < files?.length; i++){ 
        formData.append(fileKey, (files[i]), i + fileName);
    };

    const config = {
        method: 'post',
        url: `${BASE}/${url}`,
        data: formData
    };

    try {
        const response = await axios(config);
        const payload = response.data;
        dispatch({
            type,
            payload: {
                ...payload,
                success: true
            }
        });
    } catch (err) {
        dispatch({
            type,
            payload: {
                success: false,
                ...err?.response?.data
            }
        });
    };
}

// ACCOUNTS
// CHECK CURRENT USER
export const checkStatus = () => simpleRequest({
    url: 'users/current', type: 'CHECK_STATUS', method: 'get'
});

// LOGIN
export const loginUser = body => simpleRequest({
    url: 'users/login', type: 'LOGIN_USER', body
});

// REGISTER
export const createUser = body => simpleRequest({
    url: 'users/register', type: 'CREATE_USER', body
});

// LOGOUT
export const logoutUser = () => simpleRequest({
    url: 'users/logout', type: 'LOGOUT_USER', method: 'put' 
});

// TODOS
// ADD TODO
export const addTodo = body => {
    const { fileName, file } = body;
    const { title, body: description, expiresIn, unit, priority } = body;
    return simpleFormRequest({
        body: { title, body: description, expiresIn, unit, priority },
        files: file, fileName, url: 'todos/add', type: 'ADD_TODO'
    });
};

// GET TODOS
export const getTodos = () => simpleRequest({
    method: 'get', url: 'todos/all', type: 'GET_TODOS'
})
