import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Что-то пошло не так.</h1>
          <p style={{ fontSize: '16px', color: '#555' }}>Мы уже работаем над исправлением. Обновите страницу или свяжитесь с поддержкой.</p>
          <pre style={{ marginTop: '20px', color: '#a00', whiteSpace: 'pre-wrap' }}>{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
