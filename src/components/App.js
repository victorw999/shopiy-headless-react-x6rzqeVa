import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import ProductPage from '../pages/ProductPage'
import Navbar from '../components/Navbar'
import Cart from '../components/Cart'
import NavMenu from '../components/NavMenu'
import Footer from './Footer'
import ProductList from '../pages/ProductList'

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <NavMenu />
        <Cart />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} >
            <Route path="/products/:handle" element={<ProductPage />} />
          </Route>
        </Routes>
        <Footer />
      </div >
    </>
  );
}

export default App;
