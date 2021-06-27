const { Router } = require('express');
const router = Router();
const todoServices = require('./todo.services');

const add = (req, res, next) => {
    const { user, files, body } = req;
    todoServices.create(body, files, user.sub).then(todo => {
        res.json({
            message: 'Todo created successfully',
            todo
        });
    }).catch(next);
};
const all = (req, res, next) => {
    todoServices.getAll(req.user.sub).then(todos => {
        res.json({
            message: 'Todos fetched successfully',
            todos
        });
    }).catch(next);
};

router.post('/add', add);
router.get('/all', all);

module.exports = router;