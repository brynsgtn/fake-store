import Button from 'react-bootstrap/Button';
import './../Styles/ProductList.css';
import { useState,useContext } from 'react';
import { ProductContext } from "../App";
import Footer from './Footer';


const ProductView = () => {
    
    const [quantity, setQuantity] = useState(0);
    const { selectedProduct } = useContext(ProductContext);
    const { cartItems } = useContext(ProductContext);
   
    console.log(`Cart Items: ${cartItems} Product view`)
    console.log(`Selected products: ${JSON.stringify(selectedProduct)} Product view component`);
  

    const addClick = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    const minusClick = () => {
        setQuantity(prevQuantity => prevQuantity - 1);
    }

    // const handleAddToCart = () => {
    //     addToCart(selectedProduct); // Call addToCart with selectedProduct
    // }
    // const addToCart = () => {
    //     const newItem = {
    //         id: id,
    //         title: title,
    //         price: price,
    //         quantity: quantity
    //     };

    //     setCartItems(prevCartItems => [...prevCartItems, newItem]);
    //     setQuantity(0); 
    // };
 
   
  
    return(
        <>
            <div className="d-flex justify-content-center align-items-center container-fluid">
                <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center product-view-container px-2 my-5 my-md-0">
                    <div className="w-100 mb-3 mb-lg-0 text-center"> 
                        <img className="product-image" src={selectedProduct.image} />
                    </div>
                    <div className="px-lg-5 text-lg-start text-center"> 
                        <p className="product-name fs-5 fw-bold">{selectedProduct.title}</p>
                        <p>{selectedProduct.description}</p>
                        <p className="fw-bold">${selectedProduct.price}</p>
                        <p>Quantity:
                            <Button variant="dark" className="rounded-circle ms-2"  onClick={minusClick} disabled={quantity === 0}>-</Button>
                            <span className="mx-2">{quantity}</span>
                            <Button variant="dark" className="rounded-circle" onClick={addClick} >+</Button>
                            
                        </p>
                    <div>
                        <Button variant="outline-secondary" size="sm" className="mr-2 mx-2 mb-lg-0">Buy Now</Button>
                        <Button variant="outline-secondary" size="sm" >Add to Cart</Button>
                    </div>
                    </div>
                </div>
            </div>
        <Footer />  
        </>

    )
}

export default ProductView;