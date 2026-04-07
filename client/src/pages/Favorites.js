import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const load = () => setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    load();
    window.addEventListener('favoritesUpdated', load);
    window.addEventListener('storage', load);

    const timer = setTimeout(() => setLoading(false), 500);

    return () => {
      window.removeEventListener('favoritesUpdated', load);
      window.removeEventListener('storage', load);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Loader message="Загрузка избранного..." />;
  }

  return (
    <main style={{ marginTop: '120px', padding: '30px 0' }}>
      <div className="container">
        <h1 className="section-title">ИЗБРАННОЕ</h1>
        <p style={{ marginBottom: '18px', color: 'var(--muted-color)', fontSize: '14px' }}>
          Здесь хранятся товары, отмеченные сердечком.
        </p>

        {favorites.length === 0 ? (
          <p style={{ color: '#999', padding: '40px', textAlign: 'center' }}>Пока нет сохраненных товаров.</p>
        ) : (
          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {favorites.map((item) => (
              <div key={item.id} className="product-card" style={{ position: 'relative' }}>
                <div style={{ aspectRatio: '3/4', background: '#f0f0f0', overflow: 'hidden', marginBottom: '12px' }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/480x640?text=Фото+скоро'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <h4 style={{ fontSize: '12px', marginBottom: '6px' }}>{item.name}</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-color)' }}>{item.price}</p>
                <p style={{ fontSize: '10px', color: 'var(--muted-color)' }}>Категория: {item.cat}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
