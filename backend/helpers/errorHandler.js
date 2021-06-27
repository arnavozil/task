const EXCEED_MESSAGE = 'Please choose no more than 3 files at once.';

const errorHandler = (err, req, res, next) => {

    if(typeof err === 'string'){
        // custom application error
        return res.status(400).json({
            message: err
        });
    }else if(err.name === 'ValidationError'){
        // mongoose error
        return res.status(400).json({
            message: err.message
        });
    }else if(err.name === 'UnautorizedError'){
        // trying to access authenticated route without token
        return res.status(400).json({
            message: 'Invalid Token'
        });
    }else if(err.message === 'Unexpected field'){
        // multer error 
        return res.status(400).json({
            message: EXCEED_MESSAGE
        });
    };

    // default to 500 server error
    return res.status(500).json({
        message: err.message
    });
};

module.exports = errorHandler;