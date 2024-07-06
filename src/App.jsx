
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Cart from "./Pages/Cart";
import Home from './Pages/Home';
import Products from './Pages/Products';
import ProductView from "./Components/ProductView";
import NotFound from "./Components/NotFound";
import PageNotFound from "./Pages/PageNotFound";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, createContext,useEffect } from "react";

export const ProductContext = createContext();

// Persist data to local storage, to avoid data loss on pag refresh or page navigation
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems")) || [];
const totalQuantityFromLocalStorage = JSON.parse(localStorage.getItem("totalQuantity")) || 0;

function App() {

  const [cartItems, setCartItems] = useState(cartFromLocalStorage);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(totalQuantityFromLocalStorage);
  const totalItem = cartItems.reduce((acc, { quantity }) => acc + quantity, 0);
 
  useEffect(() => {
      // Update state variables whenever atleast on of them changes
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
      setTotalQuantity(totalItem);
    }, [cartItems, totalQuantity]);

 

  return (
    <>
        <ProductContext.Provider value={{selectedProduct, setSelectedProduct, cartItems, setCartItems, totalQuantity, setTotalQuantity}}>
          <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductView />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/notfound" element={<NotFound/>}/>
                <Route path="/*" element={PageNotFound}/>
              </Routes>          
          </Router>
        </ProductContext.Provider>
    </>
  )
}

export default App;
