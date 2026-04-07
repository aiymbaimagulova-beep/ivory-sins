import React, { useState, useEffect } from 'react';

const postamats = {
  Алматы: ['Постамат #1 — ТРЦ Mega', 'Постамат #5 — ул. Абая 44', 'Постамат #10 — Dostyk Plaza'],
  Астана: ['Постамат #3 — ТРЦ Керуен', 'Постамат #7 — пр. Кабанбай батыра 62', 'Постамат #12 — Abu Dhabi Plaza'],
};

const Cart = () => {
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('Алматы');
  const [postamat, setPostamat] = useState('Постамат #1 — ТРЦ Mega');
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const options = postamats[city] || [];
    setPostamat(options[0] || '');
  }, [city]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const validateDelivery = () => {
    if (!name.trim()) {
      setError('Введите имя получателя.');
      return false;
    }
    if (!/^\+?\d{9,15}$/.test(phone.replace(/\s+/g, ''))) {
      setError('Введите корректный телефон +7XXXXXXXXXX.');
      return false;
    }
    setError('');
    return true;
  };

  const validatePayment = () => {
    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ''))) {
      setError('Номер карты должен содержать 16 цифр.');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expireDate)) {
      setError('Срок действия должен быть формата MM/YY.');
      return false;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setError('CVV должен состоять из 3-4 цифр.');
      return false;
    }
    setError('');
    return true;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!cartItems.length) {
        setError('Корзина пуста. Добавьте хотя бы один товар.');
        return;
      }
    }
    if (step === 2 && !validateDelivery()) return;
    if (step === 3 && !validatePayment()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep((prev) => prev + 1);
      if (step === 3) {
        localStorage.removeItem('cart');
        setCartItems([]);
      }
    }, 1200);
  };

  return (
    <div className="container" style={{ marginTop: '120px', maxWidth: '800px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '50px', fontSize: '10px' }}>
        <span style={{ fontWeight: step === 1 ? '900' : '300' }}>01 КОРЗИНА</span>
        <span>—</span>
        <span style={{ fontWeight: step === 2 ? '900' : '300' }}>02 ДОСТАВКА</span>
        <span>—</span>
        <span style={{ fontWeight: step === 3 ? '900' : '300' }}>03 ОПЛАТА</span>
      </div>

      {step === 1 && (
        <div>
          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#777' }}>Корзина пуста.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '14px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: '600' }}>{item.name}</p>
                    <p style={{ margin: '6px 0 0', color: '#555' }}>x{item.count || 1}</p>
                  </div>
                  <p style={{ margin: 0 }}>{item.price}</p>
                </div>
              ))}
              <div style={{ padding: '14px 0', borderTop: '1px solid #ddd', marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                <span>Итого</span>
                <span>
                  {cartItems.reduce((sum, item) => sum + Number(String(item.price).replace(/\D/g, '')) * (item.count || 1), 0).toLocaleString('ru-RU')} KZT
                </span>
              </div>
            </div>
          )}
          {error && <p style={{ color: 'red', marginTop: '14px', fontSize: '12px' }}>{error}</p>}
          <button onClick={handleNextStep} className="btn-main" style={{ width: '100%', marginTop: '30px' }}>{loading ? 'ЗАГРУЗКА...' : 'ОФОРМИТЬ ЗАКАЗ'}</button>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3 style={{ fontSize: '12px' }}>АДРЕС ДОСТАВКИ</h3>
          <label style={{ fontSize: '11px', fontWeight: '600' }}>Получатель</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ф.И.О."
            style={{ padding: '14px', border: '1px solid #000' }}
          />
          <label style={{ fontSize: '11px', fontWeight: '600' }}>Телефон</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7XXXXXXXXXX"
            style={{ padding: '14px', border: '1px solid #000' }}
          />
          <label style={{ fontSize: '11px', fontWeight: '600' }}>Город</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} style={{ padding: '14px', border: '1px solid #000' }}>
            <option value="Алматы">Алматы</option>
            <option value="Астана">Астана</option>
          </select>
          <label style={{ fontSize: '11px', fontWeight: '600' }}>Постамат</label>
          <select value={postamat} onChange={(e) => setPostamat(e.target.value)} style={{ padding: '14px', border: '1px solid #000' }}>
            {(postamats[city] || []).map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          {error && <p style={{ color: 'red', marginTop: '5px', fontSize: '12px' }}>{error}</p>}
          <button onClick={handleNextStep} className="btn-main">{loading ? 'ЗАГРУЗКА...' : 'ПЕРЕЙТИ К ОПЛАТЕ'}</button>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h3 style={{ fontSize: '12px' }}>ДАННЫЕ КАРТЫ</h3>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
            placeholder="0000 0000 0000 0000"
            style={{ padding: '15px', border: '1px solid #000' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value.slice(0, 5))}
              placeholder="ММ/ГГ"
              maxLength={5}
              style={{ padding: '15px', border: '1px solid #000', flex: 1 }}
            />
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="CVV"
              maxLength={4}
              style={{ padding: '15px', border: '1px solid #000', flex: 1 }}
            />
          </div>
          {error && <p style={{ color: 'red', marginTop: '5px', fontSize: '12px' }}>{error}</p>}
          <button onClick={handleNextStep} className="btn-main">{loading ? 'ОБРАБОТКА...' : 'ПОДТВЕРДИТЬ ОПЛАТУ'}</button>
        </div>
      )}

      {step === 4 && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>ЗАКАЗ ПРИНЯТ</h2>
          <p style={{ fontSize: '12px', color: '#666' }}>НОМЕР ВАШЕГО ЗАКАЗА #IV-2026. МЫ СВЯЖЕМСЯ С ВАМИ В БЛИЖАЙШЕЕ ВРЕМЯ.</p>
          <button onClick={() => window.location.href = '/'} className="btn-main" style={{ marginTop: '30px' }}>НА ГЛАВНУЮ</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
