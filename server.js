// server.js
const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'https://твой-фронт.vercel.app'],
    credentials: true
}));
app.use(express.json());

let db;

// Инициализация базы данных
(async () => {
    db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });
    // Создаем таблицу пользователей, если её нет
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT
        )
    `);
    console.log("Database Ready");
})();

// API для регистрации (Критерий 6.2 - Безопасность/Хеширование)
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(400).json({ error: "User already exists or DB error" });
    }
});

// API для входа (Аутентификация)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.get('SELECT * FROM users WHERE EMAIL = ?', [email]);
    
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ message: "Welcome", user: { email: user.email } });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Обработка запросов, которых нет (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Общий обработчик ошибок (500)
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});