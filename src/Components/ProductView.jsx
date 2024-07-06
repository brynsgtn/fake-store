import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { ProductContext } from "../App";
import Footer from './Footer';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2'
import Header from './Header';
import '../Styles/ProductView.css'
import NavBar from './NavBar';

const ProductView = () => {
    const [quantity, setQuantity] = useState(1)
    const { cartItems, setCartItems, selectedProduct, setSelectedProduct } = useContext(ProductContext);
    const { id } = useParams(); // Get the product ID from URL params
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate(); 

    useEffect(() => {
        setLoading(true); // Set loading to true before fetch
        // Fetch selected products on product id or selected product updates
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    setSelectedProduct(data);
                    setLoading(false); // Set loading to false after fetch
                }, 2000)
                
            })
            .catch(error => {
                navigate("/notfound")// Navigate to NotFound page if there is an error
                setLoading(false); // Set loading to false on error
            });
    }, [id, setSelectedProduct]);

    // Increment quantity by 1
    const addClick = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    // Decrement quantity by 2
    const minusClick = () => {
        setQuantity(prevQuantity => prevQuantity - 1);
    };

    // Buy current product
    const buyNow = () => {
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
                    title: "Thank you for your purchase!",
                    text: "Your order will arrive soon!",
                    icon: "success"
                }).then(() => {
                    setTimeout(() => {
                        navigate('/'); // Navigate to home page after confirming purchase
                    }, 500);
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                setTimeout(() => {
                    navigate(`/products/${id}`); // Navigate to same product page when cancelled
                }, 500);
            }
        });
    };

    // Add current item to cart
    const addToCart = () => {
        const existingProduct = cartItems.find(product => product.id === selectedProduct.id);

        // If product exist in cart, update only the quantity
        if (existingProduct) {
            setCartItems(
                cartItems.map(product =>
                    product.id === selectedProduct.id
                        ? { ...product, quantity: product.quantity + quantity }
                        : product
                )
            );
        } else { // Else add the selected product to cart
            const newItem = {
                id: selectedProduct.id,
                title: selectedProduct.title,
                price: selectedProduct.price,
                image: selectedProduct.image,
                quantity: quantity
            };
            setCartItems(prevCartItems => [...prevCartItems, newItem]);
        }

        // Toast for added item to cart
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Added to cart"
          });
        
        // Reset quantity count to zero 
        setQuantity(0);
    };

    // Navigate to cart page
    const goToCart = () => {
        navigate(`/cart`);
    }

    return (
        <>  
            <NavBar />
            { loading ? (
                            <div className="spinner-container">
                                <Spinner animation="grow" variant="secondary" />
                                <Spinner animation="grow" variant="secondary" />
                                <Spinner animation="grow" variant="secondary" />
                                <Spinner animation="grow" variant="secondary" />
                                <Spinner animation="grow" variant="secondary" />
                            </div>
                        ) 
                        : 
                        (
                            <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa'}}>
                                <div className="m-4 product">
                                    <div>
                                        <Header text="Product Details" />
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center"> 
                                        <div className="d-flex flex-column justify-content-center align-items-center " style={{ minHeight: '80vh' }}>
                                            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center bg-white p-4">
                                                <div className="w-100 mb-3 mb-lg-0 text-center">
                                                    <img className="product-image" src={selectedProduct.image} alt="Product" />
                                                </div>
                                                <div className="px-lg-5 text-lg-start text-center">
                                                    <p className="product-name fs-2 fw-bold">{selectedProduct ? selectedProduct.title : ''}</p>
                                                    <p>{selectedProduct.description}</p>
                                                    <p className="fw-bold">${selectedProduct.price.toFixed(2)}</p>
                                                    <p>Quantity:
                                                        <Button variant="dark" className="rounded-circle ms-2" onClick={minusClick} disabled={quantity === 1}>-</Button>
                                                        <span className="mx-2">{quantity}</span>
                                                        <Button variant="dark" className="rounded-circle" onClick={addClick}>+</Button>
                                                    </p>
                                                    <div>
                                                        <Button variant="outline-secondary" size="sm" className="mr-2 mx-2 mb-lg-0" onClick={buyNow}>Buy Now</Button>
                                                        <Button variant="outline-secondary" size="sm" onClick={() => addToCart(selectedProduct, cartItems)}>Add to Cart</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-3 d-flex justify-content-center align-items-center'>
                                                <Button className="btn" variant="dark" onClick={goToCart}>Go to Cart</Button>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        )
            };
            <Footer />
        </>
    );
}

export default ProductView;
