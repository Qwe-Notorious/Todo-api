# Todo API

REST API для системы учёта задач (Todo List) с JWT‑аутентификацией.

## Выполненные требования

- **Node.js + Express**  
- **MongoDB + Mongoose**  
- **Регистрация и авторизация** с хешированием пароля (bcrypt) и выдачей JWT  
- **CRUD для задач** с защитой JWT middleware  
- **Дополнительно:**  
  - Dockerfile и docker-compose для контейнеризации  
  - Валидация входящих данных (Joi)  
  - Юнит-тест (Jest + supertest)

---

## Технологии

- Node.js, Express  
- MongoDB, Mongoose  
- JSON Web Token (JWT), bcrypt  
- Joi (валидация)  
- Docker, docker-compose  
- Jest, supertest  

---

## Установка и запуск

### Локальный запуск (без Docker)

1. **Клонируйте репозиторий**  
   ```bash
   git clone https://github.com/Qwe-Notorious/Todo-api.git
   ```
2. **Установка зависимостей**
    ```bash
    npm install
    ```
3. **Настройка переменных окружения**
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/todo-app
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRES_IN=7d
    ```
4. **Запуск MongoDB**
    ```bash
    net start MongoDB # запуск через powerShell
    net stop MongoDB # остановка через powerShell
    ```
5. **Запуск приложения**
    ```bash
    npm run dev # режим разработки
    npm start # обычный запусе
    ```
6. **Тестирование**
    ```bash
    npm test # тест использует отдельную БД todo-tes
    ```
### Запуск через Docker
1. ```bash
    docker-compose up --build
    ```
    Это поднимет контейнеры с приложением и MongoDB. Переменные окружения будут взяты из .env (если он есть) или из docker-compose.yml
