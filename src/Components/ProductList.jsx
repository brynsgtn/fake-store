
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from "./ProductCard";
import './../Styles/ProductList.css'
import Header from "./Header";


export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setProducts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    return(
        <>
            <div className="product-container">
                <Container className="my-4">
                    <Header text="Our Products"/>
                    <Row className="justify-content-center">
                        {products.map(product => (
                            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex align-items-stretch">
                                <ProductCard id={product.id} 
                                        title={product.title}
                                        image={product.image}
                                        price={product.price}
                                        description={product.description}
                                    />   
                            </Col>  
                        ))}
                    </Row>
                </Container>     
            </div>
        </>
    )
};