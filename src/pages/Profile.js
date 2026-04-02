import React, { useEffect, useMemo, useState } from 'react';

const mockOrders = [
  { id: 2501, status: 'В обработке', price: 45000, items: [{ name: 'ATLAS MAXI DRESS', qty: 1 }, { name: 'STUDIO HAT', qty: 1 }], from: 'Astana', to: 'Постамат #12, ТРЦ Керуен' },
  { id: 2502, status: 'Доставляется', price: 78000, items: [{ name: 'CYBER BLAZER', qty: 1 }, { name: 'LEATHER MINI SKIRT', qty: 1 }], from: 'Astana', to: 'Постамат #15, ТРЦ Мега' },
];

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(storedUser);
      setIsLoading(false);
    }, 400);
  }, []);

  const orders = useMemo(() => (user ? mockOrders : []), [user]);

  if (isLoading) {
    return (
      <div className="container" style={{ marginTop: '150px' }}>
        <div className="skeleton" style={{ height: '180px', marginBottom: '16px', borderRadius: '12px' }} />
        <div className="skeleton" style={{ height: '180px', marginBottom: '16px', borderRadius: '12px' }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container" style={{ marginTop: '150px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '22px', marginBottom: '20px' }}>Пожалуйста, войдите</h1>
        <p style={{ marginBottom: '18px', color: 'var(--muted-color)' }}>Личный кабинет доступен после авторизации.</p>
        <button onClick={() => (window.location.href = '/login')} className="button-pill">Войти</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '150px', minHeight: 'calc(100vh - 220px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '24px' }}>
        <aside className="glass-card" style={{ padding: '22px' }}>
          <h2 style={{ fontSize: '14px', letterSpacing: '2px', marginBottom: '16px' }}>Меню</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="button-pill" onClick={() => document.getElementById('orders').scrollIntoView({ behavior: 'smooth' })}>Мои заказы</button>
            <button className="button-pill" onClick={() => document.getElementById('settings').scrollIntoView({ behavior: 'smooth' })}>Настройки</button>
            <button className="button-pill" onClick={() => document.getElementById('favorite').scrollIntoView({ behavior: 'smooth' })}>Избранное</button>
          </div>
        </aside>

        <section>
          <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '22px', marginBottom: '8px' }}>Привет, {user.name || user.email.split('@')[0]}!</h1>
            <p style={{ color: 'var(--muted-color)', marginBottom: '14px' }}>Твой стиль сегодня — огонь. Ваш образ уже собирается в Астане.</p>
            <p style={{ fontSize: '12px' }}>Доступ к персональным предложениям и историям заказов.</p>
          </div>

          <div id="orders" className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>История заказов</h2>
            {orders.length === 0 ? (
              <p style={{ color: 'var(--muted-color)' }}>У вас пока нет заказов.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="glass-card" style={{ padding: '14px', marginBottom: '14px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                    <p style={{ fontSize: '12px', fontWeight: 800 }}>Заказ №{order.id} — {order.status}</p>
                    <p style={{ fontSize: '11px', color: 'var(--muted-color)' }}>Сумма: {order.price.toLocaleString()} ₸</p>
                    <button onClick={() => setActiveOrder(order)} className="button-pill" style={{ fontSize: '10px' }}>Детали</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div id="settings" className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Настройки</h2>
            <p style={{ fontSize: '11px', color: 'var(--muted-color)', marginBottom: '12px' }}>Email: {user.email}</p>
            <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="button-pill" style={{ width: 'auto' }}>Выйти</button>
          </div>

          <div id="favorite" className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Избранное</h2>
            <p style={{ color: 'var(--muted-color)' }}>Здесь появятся ваши избранные образы.</p>
          </div>
        </section>

        {activeOrder && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.35)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <div className="glass-card" style={{ width: 'min(92vw, 520px)', padding: '24px', position: 'relative' }}>
              <button onClick={() => setActiveOrder(null)} style={{ position: 'absolute', top: '10px', right: '12px', border: 'none', background: 'transparent', color: 'var(--text-color)', fontSize: '18px', cursor: 'pointer' }}>×</button>
              <h3 style={{ marginBottom: '8px' }}>Детали заказа #{activeOrder.id}</h3>
              <p style={{ fontSize: '12px', color: 'var(--muted-color)', marginBottom: '14px' }}>Откуда: {activeOrder.from} → Куда: {activeOrder.to}</p>
              <div style={{ display: 'grid', gap: '8px', marginBottom: '12px' }}>
                {activeOrder.items.map((i) => (
                  <p key={i.name} style={{ fontSize: '11px', margin: 0 }}>• {i.name} × {i.qty}</p>
                ))}
              </div>
              <p style={{ fontWeight: 700 }}>Итого: {activeOrder.price.toLocaleString()} ₸</p>
              <p style={{ fontSize: '11px', color: 'var(--muted-color)', marginTop: '8px' }}>Ваш образ уже в работе — скоро к вам!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;