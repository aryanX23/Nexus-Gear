import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage'
import HomePage from './pages/HomePage'
import Cart from './components/Cart/Cart'
import ProductPage from './pages/ProductPage';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

function App() {
  return (
      <div>
          <Routes>
              {/* Specify components for each route */}
              <Route path="/productPage" element={<ProductPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/checkout/success" element={<Success />} />
              <Route path="/checkout/cancel" element={<Cancel />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/" element={<HomePage />} />
          </Routes>
      </div>
  );
}

export default App;
