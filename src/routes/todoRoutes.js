const express = require('express');
const authMeddleware = require('../middleware/auth');
const {
    getTodos,
    createTodo,
    updateTodoStatus,
    deleteTodo
} = require('../controllers/todoController');

const router = express.Router();

// Требование авторизации 
router.use(authMeddleware);

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', updateTodoStatus);
router.delete('/:id', deleteTodo);

module.exports = router;