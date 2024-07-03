
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import './../Styles/Card.css'



export default function ProductCard({ id, title, image, price}) {

  return (
    <Card className="card" key={id}>
      <Card.Img variant="top" src={image} alt={title} className="card-img-top p-5" />
      <Card.Title className="card-title px-3 text-center fs-6 fw-bold">{title}</Card.Title>
      <Card.Text className="text-center">$ {price.toFixed(2)}</Card.Text>
      <div className="card-overlay">
        <div className="overlay-content">
          <Button className='btn btn-outline-light'>View Product</Button>
        </div>
      </div>
    </Card>
  );
}
