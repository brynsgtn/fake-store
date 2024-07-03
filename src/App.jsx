
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import NavBar from "./Components/NavBar";
import Cart from "./Pages/Cart";
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductView from "./Components/ProductView";
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom'
import { useState, createContext,useEffect } from "react";

export const ProductContext = createContext();


const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
const totalQuantityFromLocalStorage = JSON.parse(localStorage.getItem("totalQuantity")) || 0;
function App() {

  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(totalQuantityFromLocalStorage);
  const totalItem = cartItems.reduce((acc, { quantity }) => acc + quantity, 0)
    useEffect(() => {
        // Update totalQuantity whenever cartItems changes
        setTotalQuantity(totalItem);
    }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity))
  }, [totalQuantity]);

 

  // const deleteProduct = (current) => {
  //   setCartItems(cartItems.filter((product) => product.id !== current.id));
  // };

  return (
    <>
        <ProductContext.Provider value={{selectedProduct, setSelectedProduct, cartItems, setCartItems, totalQuantity, setTotalQuantity}}>
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
