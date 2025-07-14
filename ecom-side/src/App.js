import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Products from './pages/Products';
import Cart from './pages/Cart';

import CartContext from './context/Cartcontext';
import { useState } from 'react';

function App() {
  
  const [cart, setCart] = useState([]);
  
  return (
    <CartContext.Provider value={{ cart, setCart }}>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>  
    </CartContext.Provider>
  );
}

export default App;
