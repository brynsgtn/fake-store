import Footer from "../Components/Footer";
import './../Styles/Cart.css'
import Button from 'react-bootstrap/Button';
import { ProductContext } from "../App";
import { useContext } from 'react';
import Header from "../Components/Header";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import NavBar from "../Components/NavBar";


export default function Cart() {

    const { cartItems, setCartItems} = useContext(ProductContext);
    const navigate = useNavigate(); 
    const total = cartItems.reduce((acc, { quantity, price }) => acc + quantity * price, 0);
    
    // Checkout all items in cart
    const checkOut = () => {

        // Modal alert for checkout
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Proceed to checkout"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Thank you for you purchase!",
                text: "Your order will arrive soon!",
                icon: "success"
              });
            }
          }).then(() => {
            // Delay of 0.5 seconds before navigating to home page
            setTimeout(() => {
                setCartItems([]);// Reset cart items to zero
                navigate('/'); // Navigate to home page after confirming purchase
            }, 500)
          });
    };
    
    // Delete product in cart
    const deleteProduct = (current) => {
        // Delete current product
        setCartItems(cartItems.filter((product) => product.id !== current.id));
        // Modal alert
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "warning",
            title: "Removed item from cart"
        });
  };

    // Increment quantity by one
    const addClick = (item) => {
        setCartItems(cartItems.map((product) =>
            product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
        ));
    };

    // Decrement quantity by one
    const minusClick = (item) => {
        setCartItems(cartItems.map((product) =>
            product.id === item.id && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
        ));
    };

    // Navigate to product page
    const goToShop = () => {
        navigate(`/products`);
    };

    return (
        <>
            <NavBar/>
            <div className="d-flex justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                <div className="product my-4">
                        {/* Show header if cart is empty */}
                        {cartItems.length > 0 && <Header text="Your Cart" />} 
                        <div className="container-fluid d-flex justify-content-center align-items-center">
                            <div className="w-100 text-center">
                                {cartItems.length === 0 ? 
                                                        (   // Show logo and button link to shop if cart is empty
                                                            <div className="d-flex justify-content-center vh-50 mt-5">
                                                                <div>
                                                                    <img
                                                                        alt=""
                                                                        src={logo}
                                                                        width="250"
                                                                        height="250"
                                                                        className="rounded-circle"
                                                                    />
                                                                    <p className="empty-cart-message">No items in cart.</p>
                                                                    <Button className="btn" variant="dark" onClick={goToShop} style={{ width: '100%' }}>Shop Now</Button>
                                                                </div>
                                                            </div>
                                    
                                                        ) 
                                                        : 
                                                        (
                                                            <>
                                                                {/* Show items in cart if not empty */}
                                                                {cartItems.map((item) => (
                                                                                            <div className="d-lg-flex justify-content-center align-items-center w-100 my-5 border-bottom bg-white" key={item.id}>
                                                                                                <div className="text-center">
                                                                                                    <img src={item.image} alt="" className="product-image p-3" />
                                                                                                </div>
                                                                                                <div className="mx-3 flex-grow-1">
                                                                                                    <p className="fw-bold mt-3 mt-md-0 fs-5 ">{item.title}</p>
                                                                                                </div>
                                                                                                <div className="mx-3">
                                                                                                    <p className="fw-bolder">${item.price.toFixed(2)}</p>
                                                                                                </div>
                                                                                                <div className="mx-3 ">
                                                                                                    <p className="d-lg-flex justify-content-center align-items-center">Quantity:
                                                                                                        <Button variant="dark" className="rounded-circle ms-2" onClick={() => minusClick(item)} disabled={item.quantity === 1}>-</Button>
                                                                                                        <span className="mx-2">{item.quantity}</span>
                                                                                                        <Button variant="dark" className="rounded-circle" onClick={() => addClick(item)}>+</Button>
                                                                                                    </p>
                                                                                                </div>
                                                                                                <div className="mx-3 text-center text-lg-start mb-3">
                                                                                                    <Button className="btn btn-link custom-btn" onClick={() => deleteProduct(item)}>
                                                                                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 4h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z"></path></g></svg>
                                                                                                    </Button>
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                )
                                                                }
                                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                                    <div>
                                                                        <p className="fs-1 fw-bold">Total: ${total.toFixed(2)}</p>
                                                                    </div>
                                                                    <div className="my-3">
                                                                        <Button className="btn" variant="dark" onClick={checkOut}>Proceed to Checkout</Button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                    }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
