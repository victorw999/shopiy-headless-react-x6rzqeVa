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
          <Route path="/products" >
            <Route index element={<ProductList />} />
            <Route path=":handle" element={<ProductPage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div >
    </>
  );
}

export default App;
