import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'font-awesome/css/font-awesome.min.css';
import './../Styles/NavBar.css'

export default function NavBar({count}) {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark navbar">
      <Container>
      <Navbar.Brand href="/">
            <img
              alt=""
              src="./logo.png"
              width="40"
              height="40"

            />{' '}
            Fake Store
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className='mx-3'>Home</Nav.Link>
            <Nav.Link href="/Products" className='mx-3'>Products</Nav.Link>
            <Nav.Link href="/Cart" className='mx-3'>
            <span className="fa-stack fa-1x has-badge" data-count={count}>
            <i className="fa fa-shopping-cart fa-stack-1.5x cart"></i>
            </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
