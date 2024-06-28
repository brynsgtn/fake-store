import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import './../Styles/Cart.css'
import Button from 'react-bootstrap/Button';
import { ProductContext } from "../App";
import { useContext } from 'react';


export default function Cart() {
    const { cartItems } = useContext(ProductContext);
    return (
        <>
                <div className="cart-container d-flex flex-column align-items-center">
                    <div className="d-lg-flex justify-content-center align-items-center w-75 my-5 border-bottom">
                        <div className="text-center">
                            <img src="./logo.png" alt="" className="product-image"/>
                        </div>
                        <div className="mx-3">
                            <p className="fw-bold">Title</p>
                        </div>
                        <div className="mx-3">
                            <p className="fw-bolder">Price</p>
                        </div>
                        <div className="mx-3">
                            <p>Quantity:
                                <Button variant="dark" className="rounded-circle ms-2">-</Button>
                                <span className="mx-2">1</span>
                                <Button variant="dark" className="rounded-circle">+</Button>
                            </p>
                        </div>
                        <div className="mx-3 text-center text-lg-start mb-3">
                            <Button className="btn btn-link custom-btn">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="2em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 4h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z"></path></g></svg>
                            </Button>
                        </div>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div>
                            <p className="fs-3 fw-bold">Total in cart: {cartItems.length}</p>
                        </div>
                        <div className="mt-3">
                            <Button className="btn" variant="dark">Proceed to Checkout</Button>
                        </div>
                    </div>
                </div>
                
            <Footer />
        </>
    )
}