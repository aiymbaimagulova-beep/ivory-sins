import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ theme, onToggleTheme }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isAuthed, setIsAuthed] = useState(false);
  const [userEmail, setUserEmail] = useState('Гость');

  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length;
  };

  useEffect(() => {
    setCartCount(getCartCount());
    const onUpdate = () => setCartCount(getCartCount());
    window.addEventListener('cartUpdated', onUpdate);
    window.addEventListener('storage', onUpdate);

    const user = JSON.parse(localStorage.getItem('user') || null);
    if (user?.email) {
      setIsAuthed(true);
      setUserEmail(user.email);
    }

    return () => {
      window.removeEventListener('cartUpdated', onUpdate);
      window.removeEventListener('storage', onUpdate);
    };
  }, []);

  return (
    <header className="glass-card" style={{
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'var(--surface-color)',
      backdropFilter: 'blur(12px)',
      width: '100%',
      marginBottom: '14px'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px' }}>
        <nav style={{ flex: 1 }}>
          <ul style={{ display: 'flex', gap: '18px', listStyle: 'none', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', color: 'var(--muted-color)' }}>
            <li className="nav-item"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>ГЛАВНАЯ</Link></li>
            <li className="nav-item"><Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>КАТАЛОГ</Link></li>
            <li className="nav-item"><Link to="/lookbook" style={{ textDecoration: 'none', color: 'inherit' }}>LOOKBOOK</Link></li>
          </ul>
        </nav>

        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-color)', fontSize: '20px', fontWeight: '900', letterSpacing: '12px', flex: 1, textAlign: 'center' }}>
          IVORY SINS
        </Link>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '14px', alignItems: 'center', fontSize: '11px', fontWeight: 700 }}>
          <button onClick={onToggleTheme} className="button-pill" style={{ padding: '8px 14px', fontSize: '10px' }}>
            {theme === 'dark' ? 'Светлая' : 'Темная'}
          </button>
          <Link to={isAuthed ? '/profile' : '/login'} className="button-pill" style={{ fontSize: '10px' }}>
            {isAuthed ? 'Профиль' : 'Войти'}
          </Link>
          <Link to="/favorites" className="button-pill" style={{ fontSize: '10px' }}>
            Избранное
          </Link>
          <Link to="/cart" className="button-pill" style={{ fontSize: '10px' }}>
            Корзина ({cartCount})
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;