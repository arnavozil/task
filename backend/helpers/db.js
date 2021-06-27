const mongoose = require('mongoose');
const { testDatabase, prodDatabase } = require('../config.json');
const { userModel } = require('../users/users.model');
const { todoModel } = require('../todo/todo.model');

let url = prodDatabase;
if(process.env.NODE_ENV === 'development'){
    url = testDatabase;
};

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

module.exports = {
    User: userModel,
    Todo: todoModel
};