import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Добавили для плавного перехода

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleAuth = async (endpoint) => {
    const value = email.trim();
    const passwordValue = password.trim();

    if (!value || !passwordValue) {
      setMessage('ERROR: Пожалуйста, заполните все поля.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setMessage('ERROR: Введите корректный email.');
      return;
    }

    setLoading(true);
    setMessage(''); 

    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, password: passwordValue }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify({ email: value }));
        
        setMessage(`SUCCESS: ${data.message}`);
        
        setTimeout(() => {
          navigate('/profile');
        }, 1000);

      } else {
        setMessage(`ERROR: ${data.error || 'Ошибка авторизации'}`);
      }
    } catch (err) {
      setMessage('ERROR: Server is offline (Проверь терминал с node server.js)');
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
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '15px', border: '1px solid #000', textTransform: 'uppercase' }}
        />
        <input 
          type="password" 
          placeholder="PASSWORD" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '15px', border: '1px solid #000', textTransform: 'uppercase' }}
        />

        {message && (
          <p style={{ 
            fontSize: '10px', 
            color: message.includes('ERROR') ? 'red' : 'black',
            fontWeight: 'bold' 
          }}>
            {message}
          </p>
        )}
        
        <button 
          onClick={() => handleAuth('login')} 
          className="btn-main" 
          disabled={loading} 
          style={{ 
            padding: '15px',
            backgroundColor: '#000',
            color: '#fff',
            cursor: 'pointer',
            opacity: loading ? 0.6 : 1 
          }}
        >
          {loading ? 'ОЖИДАЙТЕ...' : 'LOG IN'}
        </button>

        <button 
          onClick={() => handleAuth('register')} 
          disabled={loading} 
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '10px', 
            cursor: 'pointer', 
            textDecoration: 'underline', 
            opacity: loading ? 0.6 : 1 
          }}
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default Login;