import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import { initEmailJS } from './services/emailService';

function App() {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}

export default App;
