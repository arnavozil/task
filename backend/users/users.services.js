const { User } = require("../helpers/db");
const { secret } = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authenticate = async ({
    username,
    password
}) => {
    const user = await User.findOne({ username });
    if(user && bcrypt.compareSync(password, user.hash)){
        const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    };
};

const create = async params => {
    // validating user
    const existingUser = await User.findOne({ username: params.username });
    if(existingUser) throw `username ${params.username} is already taken`;
    const adminUser = await User.findOne({ role: 'admin' });
    params = { ...params, role: Boolean(adminUser) ? 'user' : 'admin' };
    
    const user = new User(params);
    if(params.password){
        user.hash = bcrypt.hashSync(params.password, 10);
    };
    await user.save();

    // logging in user right away
    return await authenticate({
        username: params.username, 
        password: params.password
    });
};

const sendUser = (res, user, message) => {
    if(user){
        //  to send user token as a cookie
        res.cookie('token', user.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });

        delete res.token;
        res.json(user);
    }else{
        res.status(400).json({
            message
        });
    };
};

const getById = async id => {
    const user = await User.findById(id);
    if(!user) throw 'No user found (login/signup required).';
    return user;
}

module.exports = {
    sendUser, create,
    authenticate,
    getById
};
