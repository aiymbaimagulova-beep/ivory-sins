import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader message="Загрузка главной страницы..." />;
  }

  const handleSubscribe = (event) => {
    event.preventDefault();
    const emailValue = subscribeEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
      setSubscribeMessage('Введите email, чтобы подписаться.');
      return;
    }
    if (!emailRegex.test(emailValue)) {
      setSubscribeMessage('Пожалуйста, укажите корректный email.');
      return;
    }

    setSubscribeMessage('Спасибо! Вы подписаны на рассылку.');
    setSubscribeEmail('');
  };

  return (
    <main style={{ marginTop: '70px' }}>
      {/* Главный экран */}
<section style={{ height: '95vh', background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  
  <img
    src="/images/home2.jpg"
    alt="Main Campaign"
    loading="lazy"
    onError={(e) => {
      e.currentTarget.src = 'https://via.placeholder.com/1920x1080?text=Ivory+Sins';
    }}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.7
    }}
  />

  <div style={{
    position: 'absolute',
    textAlign: 'center',
    color: '#fff'
  }}>
    <h2 style={{ fontSize: '10px', letterSpacing: '8px', marginBottom: '20px' }}>
      SUMMER COLLECTION 2026
    </h2>

    <h1 style={{
      fontSize: 'clamp(40px, 8vw, 100px)',
      fontWeight: '900',
      marginBottom: '40px',
      letterSpacing: '-2px'
    }}>
      IVORY SINS
    </h1>

    <button className="btn-main" style={{ background: '#fff', color: '#000' }}>
      Смотреть всё
    </button>
  </div>

</section>

      {/* Хиты продаж (из каталога, вместо блока "Платья+Аксессуары") */}
      <section className="container" style={{ padding: '100px 0' }}>
        <h2 className="section-title">ХИТЫ ПРОДАЖ</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { id: 1, cat: 'Комплекты', name: 'ВЕЧЕРНИЙ СЕТ С ПАЙЕТКАМИ', price: '68 000 KZT', img: "/images/ВЕЧЕРНИЙ СЕТ С ПАЙЕТКАМИ.jpg" },
            { id: 2, cat: 'Платья', name: 'ПЛАТЬЕ-КОМБИНАЦИЯ', price: '34 000 KZT', img: "/images/ПЛАТЬЕ-КОМБИНАЦИЯ.jpg" },
            { id: 3, cat: 'Свитеры и толстовки', name: 'ТОЛСТОВКА НА МОЛНИИ', price: '31 000 KZT', img: "/images/ТОЛСТОВКА НА МОЛНИИ.jpg" },
            { id: 4, cat: 'Обувь', name: 'БОТИЛЬОНЫ НА МАССИВНОЙ ПОДОШВЕ', price: '72 000 KZT', img: "/images/БОТИЛЬОНЫ НА МАССИВНОЙ ПОДОШВЕ.jpg" },
          ].map((product) => (
            <div key={product.id} className="product-card" style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '3/4', background: '#f5f5f5', overflow: 'hidden' }}>
                <img
                  src={product.img}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/480x640?text=Фото+скоро';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '12px' }}>
                <p style={{ fontSize: '10px', color: 'var(--muted-color)', margin: '0 0 6px' }}>{product.cat}</p>
                <h3 style={{ fontSize: '14px', margin: '0 0 8px', color: 'var(--text-color)' }}>{product.name}</h3>
                <p style={{ fontSize: '12px', fontWeight: '700', margin: 0, color: 'var(--text-color)' }}>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Рассылка (Как у люкс брендов) */}
      <section style={{ background: '#000', color: '#fff', padding: '100px 0', textAlign: 'center' }}>
         <div className="container" style={{ maxWidth: '600px' }}>
            <h2 style={{ fontSize: '18px', letterSpacing: '4px', marginBottom: '20px' }}>ПРИСОЕДИНЯЙТЕСЬ К КЛУБУ</h2>
            <p style={{ fontSize: '12px', color: 'var(--muted-color)', marginBottom: '40px' }}>Будьте первыми, кто узнает о новых дропах и закрытых распродажах.</p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
               <input
                 type="email"
                 value={subscribeEmail}
                 onChange={(e) => setSubscribeEmail(e.target.value)}
                 placeholder="ВАШ EMAIL"
                 style={{ background: 'none', border: 'none', color: '#fff', flex: 1, outline: 'none', fontSize: '12px' }}
               />
               <button type="submit" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}>
                 ПОДПИСАТЬСЯ
               </button>
            </form>
            {subscribeMessage && (
              <p style={{ marginTop: '12px', fontSize: '11px', color: subscribeMessage.startsWith('Спасибо') ? '#77c48f' : '#ffe1e6' }}>
                {subscribeMessage}
              </p>
            )}
         </div>
      </section>
    </main>
  );
};

export default Home;
