
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import NavBar from "./Components/NavBar";
import Cart from "./Pages/Cart";
import Home from './Pages/Home';
import Products from './Pages/Products';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from "react";



function App() {

  const [cartItems, setCartItems] = useState([]);
  // const [buyNowItem, setBuyNowItem] = useState(null);

  const addToCart = (current) => {
    if (cartItems.some((product) => current.id === product.id)) {
      setCartItems(
        cartItems.map((product) =>
          product.id === current.id
            ? { ...product, qty: product.qty + current.qty }
            : product
        )
      );
      return;
    }

    setCartItems(cartItems.concat(current));
  };

  // const buyNow = (current) => {
  //     setBuyNowItem(current);
  // }

  const increaseProductQty = (current) => {
    setCartItems(
      cartItems.map((product) =>
        product.id === current.id ? { ...product, qty: product.qty + 1 } : product
      )
    );
  };

  const decreaseProductQty = (current) => {
    if (current.qty === 1) return;
    setCartItems(
      cartItems.map((product) =>
        product.id === current.id ? { ...product, qty: product.qty - 1 } : product
      )
    );
  };

  const deleteProduct = (current) => {
    setCartItems(cartItems.filter((product) => product.id !== current.id));
  };

  return (
    <>

        <Router>
         <NavBar count={cartItems.length}/>
          <Routes>
            <Route path="/"  
                   element={<Home />}
            />
            <Route path="/products"
                   element={<Products 
                              addToCart={addToCart}
                              cartItems={cartItems}
                            />}
            />
            <Route path="/cart"
                   element={<Cart
                              cartItems={cartItems}
                              
                              increaseProductQty={increaseProductQty}
                              decreaseProductQty={decreaseProductQty}
                              deleteProduct={deleteProduct}
                            />}
            />
          </Routes>
        </Router>




    </>
  )
}

export default App
