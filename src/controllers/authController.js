const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/schemas");

// Регистрация нового пользователя
exports.register = async (req, res, next) => {
  try {
    // Валидация данных
    const { error } = registerSchema.validate(req.body);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    // Проверка, существует ли пользователь
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Создаем пользователя
    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

// Авторизация
exports.login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    // Нахождение пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Проверка пароля
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Создать JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
