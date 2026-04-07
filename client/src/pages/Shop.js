import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const Shop = () => {
  const [category, setCategory] = useState('Все');
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setCartCount(cart.length);
    setFavorites(favs);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item) => item.id === product.id);
    const newCart = existing
      ? cart.map((item) => (item.id === product.id ? { ...item, count: (item.count || 1) + 1 } : item))
      : [...cart, { ...product, count: 1 }];

    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartCount(newCart.reduce((sum, item) => sum + (item.count || 0), 0));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const toggleFavorite = (product) => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isExist = favs.find(f => f.id === product.id);
    let newFavs;
    
    if (isExist) {
      newFavs = favs.filter(f => f.id !== product.id);
    } else {
      newFavs = [...favs, product];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavs));
    setFavorites(newFavs);
  };

  const menuCategories = [
    'Все', 'Платья', 'Обувь', 'Юбки', 'Брюки и шорты', 
    'Блузы и рубашки', 'Майки и топы', 'Свитеры и толстовки', 
    'Комплекты', 'Спортивная одежда', 'Домашняя одежда', 'Джемперы и кардиганы'
  ];

const products = [
  { id: 101, cat: 'Юбки', name: 'ЮБКА-МАКСИ ИЗ ШЕЛКА', price: '28 000 KZT', img: "/images/ЮБКА-МАКСИ ИЗ ШЕЛКА.jpg" },
  { id: 102, cat: 'Юбки', name: 'МИНИ-ЮБКА С РАЗРЕЗОМ', price: '18 500 KZT', img: "/images/МИНИ-ЮБКА С РАЗРЕЗОМ.jpg" },
  { id: 103, cat: 'Юбки', name: 'ЮБКА-КАРГО С КАРМАНАМИ', price: '24 000 KZT', img: "/images/ЮБКА-КАРГО С КАРМАНАМИ.jpg" },
  { id: 104, cat: 'Юбки', name: 'КОЖАНАЯ ЮБКА ТРАПЕЦИЯ', price: '32 000 KZT', img: "/images/КОЖАНАЯ ЮБКА ТРАПЕЦИЯ.jpg" },

  { id: 201, cat: 'Брюки и шорты', name: 'БРЮКИ ПАЛАЦЦО ГРАФИТ', price: '35 000 KZT', img: "/images/БРЮКИ ПАЛАЦЦО ГРАФИТ.jpg" },
  { id: 202, cat: 'Брюки и шорты', name: 'ШИРОКИЕ ДЖИНСЫ Y2K', price: '38 000 KZT', img: "/images/ШИРОКИЕ ДЖИНСЫ Y2K.jpg" },
  { id: 203, cat: 'Брюки и шорты', name: 'ШОРТЫ-БЕРМУДЫ ИЗ ЛЬНА', price: '15 900 KZT', img: "/images/ШОРТЫ-БЕРМУДЫ ИЗ ЛЬНА.jpg" },
  { id: 204, cat: 'Брюки и шорты', name: 'КЛАССИЧЕСКИЕ БРЮКИ СО СТРЕЛКАМИ', price: '29 000 KZT', img: "/images/КЛАССИЧЕСКИЕ БРЮКИ СО СТРЕЛКАМИ.jpg" },

  { id: 301, cat: 'Блузы и рубашки', name: 'РУБАШКА ОВЕРСАЙЗ БЕЛАЯ', price: '19 000 KZT', img: "/images/РУБАШКА ОВЕРСАЙЗ БЕЛАЯ.jpg" },
  { id: 302, cat: 'Блузы и рубашки', name: 'АТЛАСНАЯ БЛУЗА С БАНТОМ', price: '22 500 KZT', img: "/images/АТЛАСНАЯ БЛУЗА С БАНТОМ.jpg" },
  { id: 303, cat: 'Блузы и рубашки', name: 'УКОРОЧЕННАЯ РУБАШКА В КЛЕТКУ', price: '17 000 KZT', img: "/images/УКОРОЧЕННАЯ РУБАШКА В КЛЕТКУ.jpg" },

  { id: 401, cat: 'Майки и топы', name: 'КОРСЕТНЫЙ ТОП ЧЕРНЫЙ', price: '14 500 KZT', img: "/images/КОРСЕТНЫЙ ТОП ЧЕРНЫЙ.jpg" },
  { id: 402, cat: 'Майки и топы', name: 'БАЗОВАЯ МАЙКА В РУБЧИК', price: '7 900 KZT', img: "/images/БАЗОВАЯ МАЙКА В РУБЧИК.jpg" },
  { id: 403, cat: 'Майки и топы', name: 'ТОП С ОТКРЫТЫМИ ПЛЕЧАМИ', price: '12 000 KZT', img: "/images/ТОП С ОТКРЫТЫМИ ПЛЕЧАМИ.jpg" },

  { id: 501, cat: 'Свитеры и толстовки', name: 'ХУДИ С ГРАФИЧЕСКИМ ПРИНТОМ', price: '34 000 KZT', img: "/images/ХУДИ С ГРАФИЧЕСКИМ ПРИНТОМ.jpg" },
  { id: 502, cat: 'Свитеры и толстовки', name: 'СВИТШОТ МОНОХРОМ', price: '26 000 KZT', img: "/images/СВИТШОТ МОНОХРОМ.jpg" },
  { id: 503, cat: 'Свитеры и толстовки', name: 'ТОЛСТОВКА НА МОЛНИИ', price: '31 000 KZT', img: "/images/ТОЛСТОВКА НА МОЛНИИ.jpg" },

  { id: 601, cat: 'Комплекты', name: 'ТРИКОТАЖНЫЙ КОСТЮМ С ЮБКОЙ', price: '45 000 KZT', img: "/images/ТРИКОТАЖНЫЙ КОСТЮМ С ЮБКОЙ.jpg" },
  { id: 602, cat: 'Комплекты', name: 'ДЕЛОВОЙ КОСТЮМ-ТРОЙКА', price: '85 000 KZT', img: "/images/ДЕЛОВОЙ КОСТЮМ-ТРОЙКА.jpg" },
  { id: 603, cat: 'Комплекты', name: 'ВЕЧЕРНИЙ СЕТ С ПАЙЕТКАМИ', price: '68 000 KZT', img: "/images/ВЕЧЕРНИЙ СЕТ С ПАЙЕТКАМИ.jpg" },

  { id: 701, cat: 'Спортивная одежда', name: 'ЛЕГИНСЫ С ВЫСОКОЙ ТАЛИЕЙ', price: '16 000 KZT', img: "/images/ЛЕГИНСЫ С ВЫСОКОЙ ТАЛИЕЙ.jpg" },
  { id: 702, cat: 'Спортивная одежда', name: 'СПОРТИВНЫЙ ТОП-БРА', price: '11 000 KZT', img: "/images/СПОРТИВНЫЙ ТОП-БРА.jpg" },
  { id: 703, cat: 'Спортивная одежда', name: 'РАШГАРД ДЛЯ ТРЕНИРОВОК', price: '18 000 KZT', img: "/images/РАШГАРД ДЛЯ ТРЕНИРОВОК.jpg" },

  { id: 801, cat: 'Домашняя одежда', name: 'ШЕЛКОВАЯ ПИЖАМА', price: '29 000 KZT', img: "/images/ШЕЛКОВАЯ ПИЖАМА.jpg" },
  { id: 802, cat: 'Домашняя одежда', name: 'ХЛОПКОВЫЙ ХАЛАТ КИМОНО', price: '21 000 KZT', img: "/images/ХЛОПКОВЫЙ ХАЛАТ КИМОНО.jpg" },
  { id: 803, cat: 'Домашняя одежда', name: 'МЯГКИЕ ДОМАШНИЕ БРЮКИ', price: '14 000 KZT', img: "/images/МЯГКИЕ ДОМАШНИЕ БРЮКИ.jpg" },

  { id: 901, cat: 'Джемперы и кардиганы', name: 'КАШЕМИРОВЫЙ ДЖЕМПЕР', price: '52 000 KZT', img: "/images/КАШЕМИРОВЫЙ ДЖЕМПЕР.jpg" },
  { id: 902, cat: 'Джемперы и кардиганы', name: 'УКОРОЧЕННЫЙ КАРДИГАН', price: '27 000 KZT', img: "/images/УКОРОЧЕННЫЙ КАРДИГАН.jpg" },
  { id: 903, cat: 'Джемперы и кардиганы', name: 'ДЖЕМПЕР В ПОЛОСКУ', price: '23 500 KZT', img: "/images/ДЖЕМПЕР В ПОЛОСКУ.jpg" },
  
  { id: 1001, cat: 'Платья', name: 'ВЕЧЕРНЕЕ ПЛАТЬЕ В ПОЛ', price: '58 000 KZT', img: "/images/ВЕЧЕРНЕЕ ПЛАТЬЕ В ПОЛ.jpg" },
  { id: 1002, cat: 'Платья', name: 'ПЛАТЬЕ-КОМБИНАЦИЯ', price: '34 000 KZT', img: "/images/ПЛАТЬЕ-КОМБИНАЦИЯ.jpg" },
  
  { id: 1101, cat: 'Обувь', name: 'БОТИЛЬОНЫ НА МАССИВНОЙ ПОДОШВЕ', price: '72 000 KZT', img: "/images/БОТИЛЬОНЫ НА МАССИВНОЙ ПОДОШВЕ.jpg" },
  { id: 1102, cat: 'Обувь', name: 'ЛОФЕРЫ ИЗ НАТУРАЛЬНОЙ КОЖИ', price: '46 000 KZT', img: "/images/ЛОФЕРЫ ИЗ НАТУРАЛЬНОЙ КОЖИ.jpg" },
];

  const filtered = category === 'Все' ? products : products.filter(p => p.cat === category);

  return (
    <div className="container" style={{ marginTop: '120px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: '50px' }}>
        
        {/* БОКОВОЕ МЕНЮ */}
        <aside style={{ width: '250px', position: 'sticky', top: '120px', height: 'fit-content' }}>
          <h2 style={{ fontSize: '12px', letterSpacing: '3px', marginBottom: '30px', fontWeight: 'bold' }}>КАТЕГОРИИ</h2>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '11px', cursor: 'pointer', textTransform: 'uppercase' }}>
            {menuCategories.map(cat => (
              <li 
                key={cat}
                onClick={() => setCategory(cat)} 
                style={{ 
                  lineHeight: '2.5',
                  fontWeight: category === cat ? '900' : '300',
                  transition: '0.3s',
                  color: category === cat ? '#000' : '#666'
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* СЕТКА ТОВАРОВ */}
        <div style={{ flex: 1 }}>
          {loading && <Loader message="Загрузка каталога..." />}
          
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '50px', color: 'var(--muted-color)' }}>
              Нет товаров в этой категории.
            </div>
          )}

          <div className="product-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
            gap: '40px 20px' 
          }}>
            {!loading && filtered.map(product => {
              const isFav = favorites.some(f => f.id === product.id);
              return (
                <div key={product.id} className="product-card" style={{ position: 'relative' }}>
                  
                  {/* ИКОНКА ИЗБРАННОГО */}
                  <div 
                    onClick={() => toggleFavorite(product)}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      zIndex: 10,
                      cursor: 'pointer',
                      fontSize: '20px',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <span style={{ color: isFav ? '#ff0000' : '#ccc' }}>
                      {isFav ? '❤️' : '🖤'}
                    </span>
                  </div>

                  {/* ИЗОБРАЖЕНИЕ */}
                  <div style={{ 
                    aspectRatio: '3/4', 
                    background: '#f7f7f7', 
                    marginBottom: '15px', 
                    overflow: 'hidden',
                    borderRadius: '4px' 
                  }}>
                    {product.img ? (
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/480x640?text=Фото+скоро'; }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }} 
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '10px', color: 'var(--muted-color)' }}>
                        {/* МЕСТО ДЛЯ ФОТО */}
                        PHOTO PENDING
                      </div>
                    )}
                  </div>

                  {/* ИНФО */}
                  <h3 style={{ fontSize: '11px', marginBottom: '5px', letterSpacing: '1px' }}>{product.name}</h3>
                  <p style={{ fontSize: '10px', color: 'var(--text-color)', fontWeight: '500' }}>{product.price}</p>
                  
                  <button 
                    onClick={() => addToCart(product)} 
                    className="btn-main" 
                    style={{ 
                      width: '100%', 
                      marginTop: '15px', 
                      padding: '12px', 
                      fontSize: '10px',
                      background: '#000',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      letterSpacing: '1px'
                    }}
                  >
                    В КОРЗИНУ
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;