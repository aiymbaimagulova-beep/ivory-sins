import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [modal, setModal] = useState({ open: false, title: '', content: '' });

  const openPopup = (section, item) => {
    const text = {
      'Как заказать': 'Заполните форму заказа, укажите контактные данные и выберите постамат. После подтверждения мы отправим трекинг код.',
      'Доставка и возврат': 'Бесплатная доставка по Казахстану при заказе от 70 000 KZT. Возврат товара в течение 14 дней.',
      'Помощь': 'Наш support работает 7 дней в неделю. Пишите на support@ivorysins.kz.',
      'О нас': 'IVORY SINS это минималистичный бренд с акцентом на локальное качество и современную эстетику.',
      'Новости': 'Следите за новыми коллекциями на наших страницах в соцсетях и рассылке.',
      'Карьерa': 'Открытые позиции публикуются ежемесячно. Присоединяйтесь к команде дизайнеров и маркетологов.'
    };
    setModal({ open: true, title: `${section}: ${item}`, content: text[item] || 'Информация скоро появится.' });
  };

  const closePopup = () => setModal({ open: false, title: '', content: '' });

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    document.documentElement.classList.toggle('theme-light', theme !== 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const move = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const enter = () => document.body.classList.add('cursor-hover');
    const leave = () => document.body.classList.remove('cursor-hover');

    window.addEventListener('mousemove', move);

    document.querySelectorAll('button, a, .button-pill').forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    const revealElements = Array.from(document.querySelectorAll('.reveal'));
    const onScroll = () => {
      const trigger = window.innerHeight * 0.84;
      revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) el.classList.add('active');
      });
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('scroll', onScroll);
      cursor.remove();
    };
  }, []);

  return (
    <>
      <Header theme={theme} onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
      <main className="reveal" style={{ minHeight: 'calc(100vh - 220px)' }}>
        <Outlet />
      </main>

      <footer className="glass-card" style={{ padding: '70px 0 40px', marginTop: '60px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))', gap: '22px', textAlign: 'left', color: 'var(--text-color)' }}>
          <div>
            <h4 style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '14px' }}>ПОКУПАТЕЛЯМ</h4>
            <p style={{ fontSize: '11px', marginBottom: '8px', cursor: 'pointer' }} onClick={() => openPopup('ПОКУПАТЕЛЯМ', 'Как заказать')}>Как заказать</p>
            <p style={{ fontSize: '11px', marginBottom: '8px', cursor: 'pointer' }} onClick={() => openPopup('ПОКУПАТЕЛЯМ', 'Доставка и возврат')}>Доставка и возврат</p>
            <p style={{ fontSize: '11px', marginBottom: '8px', cursor: 'pointer' }} onClick={() => openPopup('ПОКУПАТЕЛЯМ', 'Помощь')}>Помощь</p>
          </div>
          <div>
            <h4 style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '14px' }}>О БРЕНДЕ</h4>
            <p style={{ fontSize: '11px', marginBottom: '8px', cursor: 'pointer' }} onClick={() => openPopup('О БРЕНДЕ', 'О нас')}>О нас</p>
            <p style={{ fontSize: '11px', marginBottom: '8px', cursor: 'pointer' }} onClick={() => openPopup('О БРЕНДЕ', 'Новости')}>Новости</p>
            <p style={{ fontSize: '11px', marginBottom: '8px', cursor: 'pointer' }} onClick={() => openPopup('О БРЕНДЕ', 'Карьерa')}>Карьерa</p>
          </div>
          <div>
            <h4 style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '14px' }}>КОНТАКТЫ</h4>
            <p style={{ fontSize: '11px', marginBottom: '8px' }}>Flagship Store: Astana, Kazakhstan</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              {['Instagram', 'TikTok', 'Telegram'].map((title) => (
                <a key={title} className="social-item" href="#" style={{ fontSize: '11px', color: 'var(--text-color)', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{title}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '30px', textAlign: 'center', color: 'var(--muted-color)', fontSize: '10px' }}>© 2026 IVORY SINS — ALL RIGHTS RESERVED</div>
      </footer>

      {modal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div style={{ width: 'min(92vw, 420px)', padding: '25px', background: 'var(--modal-bg)', backdropFilter: 'blur(8px)', borderRadius: '12px', boxShadow: '0 12px 35px rgba(0,0,0,0.24)' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '16px', color: 'var(--text-color)' }}>{modal.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--modal-text)', lineHeight: 1.4 }}>{modal.content}</p>
            <button onClick={closePopup} className="btn-main" style={{ marginTop: '18px', display: 'block', width: '100%', color: 'var(--text-color)' }}>Закрыть</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;