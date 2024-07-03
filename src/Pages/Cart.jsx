import Footer from "../Components/Footer";
import './../Styles/Cart.css'
import Button from 'react-bootstrap/Button';
import { ProductContext } from "../App";
import { useContext } from 'react';
import Header from "../Components/Header";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


export default function Cart() {
    const { cartItems, setCartItems, setTotalQuantity} = useContext(ProductContext);
    console.log(cartItems)
    const navigate = useNavigate(); 

    const total = cartItems.reduce((acc, { quantity, price }) => acc + quantity * price, 0);
    
    const checkOut = () => {
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
            setTimeout(() => {
                navigate('/'); // Navigate to home page after confirming purchase
            }, 500)
          });
    }
      const deleteProduct = (current) => {
    setCartItems(cartItems.filter((product) => product.id !== current.id));
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
 
    const addClick = (item) => {
        setCartItems(cartItems.map((product) =>
            product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
        ));
    };

    const minusClick = (item) => {
        setCartItems(cartItems.map((product) =>
            product.id === item.id && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
        ));
    };
    return (
        <>
            <Header text="Your Cart" />
            <div className="cart-container d-flex flex-column align-items-center">
                {cartItems.length === 0 ? (
                    <p>No items in cart.</p>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <div className="d-lg-flex justify-content-center align-items-center w-75 my-5 border-bottom" key={item.id}>
                                <div className="text-center">
                                    <img src={item.image} alt="" className="product-image" />
                                </div>
                                <div className="mx-3">
                                    <p className="fw-bold">{item.title}</p>
                                </div>
                                <div className="mx-3">
                                    <p className="fw-bolder">${item.price}</p>
                                </div>
                                <div className="mx-3">
                                    <p>Quantity:
                                        <Button variant="dark" className="rounded-circle ms-2" onClick={() => minusClick(item)} disabled={item.quantity === 0}>-</Button>
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
                        ))}
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <div>
                                <p className="fs-3 fw-bold">Total: ${total.toFixed(2)}</p>
                            </div>
                            <div className="mt-3">
                                <Button className="btn" variant="dark" onClick={checkOut}>Proceed to Checkout</Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};
