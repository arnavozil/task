const { User, Todo } = require('../helpers/db');
const { oid } = require('../helpers/middlewares');
const { uploadFile } = require('../helpers/upload');
const units = {
    'day': 86400000, 'hour': 3600000,
    'month': 2628000000, 'year': 31540000000
};
const getAll = async owner => {
    const user = await User.findById(owner);
    if(!user.role === 'admin') throw `Only the admin have access to user todos`;
    const all = await Todo.find();
    return all.map(todo => {
        let {
            title, body, expiresIn, id, 
            file, priority, createdAt
        } = todo;

        expiresIn = createdAt + expiresIn;
        return {
            title, body, expiresIn, id,
            file, priority
        };
    });
};

const create = async (params, files, owner) => {
    console.log(params, files, owner);
    params['createdBy'] = oid(owner);
    let fileUrl = '';
    if(files?.length){
        try {
            fileUrl = await uploadFile(files[0]);
        } catch (error) {
            throw error;
        };
    };
    params['file'] = fileUrl;
    params.expiresIn *= units[params['unit']];
    delete params.unit;
    const todo = new Todo(params);
    return await todo.save();
};

module.exports = { getAll, create };