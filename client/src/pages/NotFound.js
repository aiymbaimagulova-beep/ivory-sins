import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '200px' }}>
    <h1 style={{ fontSize: '100px', fontWeight: '900' }}>404</h1>
    <p style={{ letterSpacing: '5px' }}>СТРАНИЦА НЕ НАЙДЕНА</p>
    <Link to="/" style={{ color: '#000', fontSize: '12px', marginTop: '20px', display: 'block' }}>
      ВЕРНУТЬСЯ НА ГЛАВНУЮ
    </Link>
  </div>
);

export default NotFound;
