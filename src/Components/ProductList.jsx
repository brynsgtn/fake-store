import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from "./ProductCard";
import './../Styles/ProductList.css';
import Header from "./Header";
import ProductView from "./ProductView";
import Spinner from 'react-bootstrap/Spinner';


export default function ProductList({addToCart, cartItems}) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductView, setIsProductView] = useState(false);
    
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Adding a delay of 1 second before setting the products
                setTimeout(() => {
                    setProducts(data);
                }, 1000);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    
    const handleClick = (e, id) => {
        const selected = products.find(product => product.id === id);
        setSelectedProduct(selected);
        setIsProductView(true);
    }
    
    console.log(selectedProduct)
    return (
        <>
            {products.length === 0 ? (
                <div className="spinner-container">
                <div>
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="secondary" />
                </div>
               
                </div>
                
            ) : (
                isProductView && selectedProduct ? (
                   <ProductView
                        selectedProduct={selectedProduct}
                        addToCart ={addToCart}
                        cartItems={cartItems}

                        />
                ) : (
                    <div className="product-flex">
                    <div className="product-container">
                        <Container className="my-4">
                            <Header text="Our Products" />
                            <Row className="justify-content-center p-4">
                                {products.map(product => (
                                    <Col key={product.id} onClick={(e) => handleClick(e, product.id)} xs={12} sm={6} md={6} lg={4} className="d-flex align-items-stretch">
                                        <ProductCard
                                            id={product.id}
                                            title={product.title}
                                            image={product.image}
                                            price={product.price}
                                            description={product.description}
                                            product={product}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                    </div>

                )
            )}
        </>
    );
}

