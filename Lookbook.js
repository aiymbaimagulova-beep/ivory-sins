import React, { useEffect, useState } from 'react';

const lookbookItems = [
  { id: 1, img: '/images/obraz1.jpg', title: '����� 1' },
  { id: 2, img: '/images/obraz2.jpg', title: '����� 2' },
  { id: 3, img: '/images/obraz3.jpg', title: '����� 3' },
  { id: 4, img: '/images/obraz4.jpg', title: '����� 4' },
  { id: 5, img: '/images/obraz5.jpg', title: '����� 5' },
  { id: 6, img: '/images/obraz6.jpg', title: '����� 6' },
  { id: 7, img: '/images/obraz7.jpg', title: '����� 7' },
  { id: 8, img: '/images/obraz8.jpg', title: '����� 8' },
  { id: 9, img: '/images/obraz9.jpg', title: '����� 9' },
  { id: 10, img: '/images/obraz10.jpg', title: '����� 10' },
  { id: 11, img: '/images/obraz11.jpg', title: '����� 11' },
  { id: 12, img: '/images/obraz12.jpg', title: '����� 12' },
  { id: 13, img: '/images/obraz13.jpg', title: '����� 13' },
  { id: 14, img: '/images/obraz14.jpg', title: '����� 14' },
  { id: 15, img: '/images/obraz15.jpg', title: '����� 15' },
  { id: 16, img: '/images/obraz16.jpg', title: '����� 16' },
  { id: 17, img: '/images/obraz17.jpg', title: '����� 17' },
  { id: 18, img: '/images/obraz18.jpg', title: '����� 18' },
  { id: 19, img: '/images/obraz19.jpg', title: '����� 19' },
  { id: 20, img: '/images/obraz20.jpg', title: '����� 20' },
];

const Lookbook = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));

  useEffect(() => {
    const storageListener = () => setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    window.addEventListener('favoritesUpdated', storageListener);
    window.addEventListener('storage', storageListener);

    return () => {
      window.removeEventListener('favoritesUpdated', storageListener);
      window.removeEventListener('storage', storageListener);
    };
  }, []);

  const toggleFavorite = (item) => {
    const exists = favorites.find((favorite) => favorite.id === item.id);
    const next = exists ? favorites.filter((favorite) => favorite.id !== item.id) : [...favorites, item];
    setFavorites(next);
    localStorage.setItem('favorites', JSON.stringify(next));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <main style={{ marginTop: '70px', padding: '80px 0' }}>
      <section className="container">
        <h1 className="section-title" style={{ marginBottom: '20px' }}>LOOKBOOK</h1>
        <p style={{ color: 'var(--muted-color)', fontSize: '14px', marginBottom: '40px' }}>
          Перед вами эстетика текущего сезона, вобравшая в себя лучшие тренды весны и лета. Коллекции, посвященные осенне-зимнему периоду, будут представлены вашему вниманию позже!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {lookbookItems.map((item) => {
            const isFav = favorites.some((favorite) => favorite.id === item.id);
            return (
              <div key={item.id} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', minHeight: '300px', background: '#f3f3f3' }}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="eager"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/480x640?text=Фото+скоро'; }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={() => toggleFavorite(item)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid #eee',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 9.24 3 10.91 3.81 12 5.08 13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill={isFav ? 'red' : 'none'}
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#fff', background: 'rgba(0,0,0,0.45)', padding: '8px 12px', borderRadius: '4px', fontSize: '12px' }}>
                  {item.title}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Lookbook;
