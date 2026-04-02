// src/pages/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Добавили пароль
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (endpoint) => {
    const value = email.trim();
    const passwordValue = password.trim();
    if (!value || !passwordValue) {
      setMessage('Пожалуйста, заполните все поля.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setMessage('Введите корректный email.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, password: passwordValue }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ email: value })); // Сохраняем данные
        setMessage(`SUCCESS: ${data.message}`);
        window.location.href = '/profile'; // Переходим в профиль
      } else {
        setMessage(`ERROR: ${data.error || 'Ошибка авторизации'}`);
      }
    } catch (err) {
      setMessage('Server is offline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '150px', maxWidth: '400px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '30px', letterSpacing: '4px' }}>ACCOUNT</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          className="input-opium"
          type="email" 
          placeholder="EMAIL" 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '15px', border: '1px solid #000', textTransform: 'uppercase' }}
        />
        <input 
          type="password" 
          placeholder="PASSWORD" 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '15px', border: '1px solid #000', textTransform: 'uppercase' }}
        />
        {message && <p style={{ fontSize: '10px', color: message.includes('ERROR') ? 'red' : 'green' }}>{message}</p>}
        
        <button onClick={() => handleAuth('login')} className="btn-main" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
          {loading ? 'ОЖИДАЙТЕ...' : 'LOG IN'}
        </button>
        <button onClick={() => handleAuth('register')} disabled={loading} style={{ background: 'none', border: 'none', fontSize: '10px', cursor: 'pointer', textDecoration: 'underline', opacity: loading ? 0.6 : 1 }}>
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default Login;