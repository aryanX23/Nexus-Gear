import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage'
import HomePage from './pages/HomePage'
import Cart from './components/Cart/Cart'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Specify components for each route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Cart" element={<Cart/>}/>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
