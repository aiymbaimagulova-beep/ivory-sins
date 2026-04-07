import React from 'react';

const Loader = ({ message = 'Загрузка...' }) => (
  <div style={{ textAlign: 'center', padding: '60px 0' }}>
    <div style={{ display: 'inline-block', width: '44px', height: '44px', border: '4px solid rgba(0,0,0,0.1)', borderTop: '4px solid #000', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <p style={{ marginTop: '15px', fontSize: '12px', fontWeight: '700' }}>{message}</p>
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Loader;
