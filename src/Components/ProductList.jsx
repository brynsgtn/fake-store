import React, { useState, useEffect, useContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from "./ProductCard";
import './../Styles/ProductList.css';
import Header from "./Header";
import Spinner from 'react-bootstrap/Spinner';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { ProductContext } from "../App";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const { setSelectedProduct } = useContext(ProductContext);
    const { selectedProduct } = useContext(ProductContext);
const navigate = useNavigate();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Adding a delay of 2 second before setting the products
                    setTimeout(() => {
                        setProducts(data);
                    }, 2000);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);



    const handleClick = (e, product) => {
        // e.preventDefault(); // P
        setSelectedProduct(prevProduct => ({
            ...prevProduct,
            ...product // Update the selected product with new properties
        }));


    };
    
    console.log(selectedProduct);

    return (
        <>
            {products.length === 0 ? (
                <div className="spinner-container">
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                </div>
            ) : (
                <div className="product-flex">
                    <div className="product-container">
                        <Container className="m-4">
                            <Header text="Our Products" />
                            <Row className="justify-content-center p-4">
                                {products.map(product => (
                                    <Col key={product.id} xs={12} sm={6} md={6} lg={4} className="d-flex align-items-stretch" onClick={(e) => handleClick(e, product)}>
                                    <Link to={`/products/${product.id}`} className="text-decoration-none" onClick={() => handleClick(product)}>
                                            <ProductCard
                                                id={product.id}
                                                title={product.title}
                                                image={product.image}
                                                price={product.price}
                                                description={product.description}
                                                product={product}
                                                
                                            />
                                    </Link>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                </div>
            )}
        </>
    );
}
