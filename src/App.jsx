
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import NavBar from "./Components/NavBar";
import Cart from "./Pages/Cart";
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductView from "./Components/ProductView";
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom'
import { useState, createContext } from "react";

export const ProductContext = createContext();


function App() {

  const [cartItems, setCartItems] = useState([0]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // const addToCart = (current) => {
  //   if (cartItems.some((product) => current.id === product.id)) {
  //     setCartItems(
  //       cartItems.map((product) =>
  //         product.id === current.id
  //           ? { ...product, qty: product.qty + current.qty }
  //           : product
  //       )
  //     );
  //     return;
  //   }

  //   setCartItems(cartItems.concat(current));
  // };


  // const increaseProductQty = (current) => {
  //   setCartItems(
  //     cartItems.map((product) =>
  //       product.id === current.id ? { ...product, qty: product.qty + 1 } : product
  //     )
  //   );
  // };

  // const decreaseProductQty = (current) => {
  //   if (current.qty === 1) return;
  //   setCartItems(
  //     cartItems.map((product) =>
  //       product.id === current.id ? { ...product, qty: product.qty - 1 } : product
  //     )
  //   );
  // };

  // const deleteProduct = (current) => {
  //   setCartItems(cartItems.filter((product) => product.id !== current.id));
  // };

  return (
    <>
        <ProductContext.Provider value={{selectedProduct, setSelectedProduct, cartItems}}>
          <Router>
            <NavBar count={cartItems.length}/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductView />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
          </Router>
        </ProductContext.Provider>


    </>
  )
}

export default App
