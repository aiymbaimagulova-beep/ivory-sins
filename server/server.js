const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();

// Разрешаем фронтенду (порт 3000) обращаться к бэкенду (порт 5000)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

let db;

// Подключение к базе данных
(async () => {
    try {
        db = await open({
            filename: path.join(__dirname, 'database.db'),
            driver: sqlite3.Database
        });
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password TEXT
            )
        `);
        console.log("✅ База данных готова (database.db)");
    } catch (err) {
        console.error("❌ Ошибка БД:", err);
    }
})();

// Маршрут регистрации
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        res.status(201).json({ message: "Пользователь создан" });
    } catch (error) {
        res.status(400).json({ error: "Такой email уже есть или ошибка БД" });
    }
});

// Маршрут логина
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: "Успешный вход", user: { email: user.email } });
        } else {
            res.status(401).json({ error: "Неверные данные" });
        }
    } catch (error) {
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});