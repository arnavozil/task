const { Router } = require('express');
const router = Router();
const userServices = require('./users.services');

const authenticate = (req, res, next) => {
    userServices.authenticate(req.body).then(user => {
        userServices.sendUser(res, user, 'Username or password is incorrect.');
    }).catch(next);
};

const register = (req, res, next) => {
    userServices.create(req.body).then(user => {
        userServices.sendUser(res, user, 'Cannot create account, please try again.');
    }).catch(next);
};

const logout = (_, res, next) => {
    try{
        res.cookie('token', '', {
            maxAge: 0,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        res.json({
            message: 'User logged out successfully'
        });
    }catch(err){
        next(err);
    }
}

const getCurrent = (req, res, next) => {
    userServices.getById(req.user.sub).then(user => {
        console.log(user);
        res.json({
            user,
            message: 'User exists'
        })
    }).catch(next);
}

router.post('/login', authenticate);
router.post('/register', register);
router.get('/logout', logout);
router.get('/current', getCurrent);

module.exports = router;