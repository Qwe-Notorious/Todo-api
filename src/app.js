require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Подключение к БД
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Обработка ошибок
app.use(errorHandler);

module.exports = app;