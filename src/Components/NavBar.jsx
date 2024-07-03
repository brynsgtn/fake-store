// NavBar.js
import React, { useContext, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';
import './../Styles/NavBar.css';
import { ProductContext } from "../App";
import logo from "../assets/logo.png";
export default function NavBar() {
  const { totalQuantity } = useContext(ProductContext);


  useEffect(() => {
    // This function will run when the component is first loaded
    console.log('Page has been refreshed or loaded for the first time');
  }, []);

  return (

    
    <Navbar expand="lg" className="bg-dark navbar-dark navbar">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="40"
            height="40"
          />{' '}
          Fake Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className='mx-3'>Home</Nav.Link>
            <Nav.Link href="/products" className='mx-3'>Products</Nav.Link>
            <Nav.Link href="/cart" className='mx-3'>
              <span className="fa-stack fa-1x has-badge" data-count={totalQuantity}>
                <i className="fa fa-shopping-cart fa-stack-1.5x cart"></i>
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
