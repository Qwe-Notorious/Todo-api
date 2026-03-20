const Todo = require("../models/Todo");
const { todoSchema, todoUpdateSchema } = require("../validators/schemas");

// Получить все задачи пользователя
exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort("-createdAt");
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// Создать задачу
exports.createTodo = async (req, res, next) => {
  try {
    const { error } = todoSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { title, description, status } = req.body;
    const todo = new Todo({
      title,
      description,
      status,
      user: req.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// Обновить статус задачи
exports.updateTodoStatus = async (req, res, next) => {
  try {
    const { error } = todoUpdateSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { id } = req.params;
    const { status } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.userId },
      { status },
      { new: true },
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Удалить задачу
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.userId });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};
