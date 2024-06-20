import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './../Styles/Card.css'

export default function ProductCard({id, title, image, price, description}) {
  return (
    <>
    
      <Card className="card" key={id}>
        <Card.Img variant="top" src={image} alt={title} className="img-fluid"/>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{title}</Card.Title>
          <Card.Text className="text-center">${price}</Card.Text>
          <Button variant="outline-secondary" size="sm">View Product</Button>
        </Card.Body>
      </Card>

    </>

  );
}

