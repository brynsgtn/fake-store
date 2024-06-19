import { useState, useEffect } from 'react'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Landing from './Components/Landing'

function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPhotos(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
    <NavBar />
    <Landing />
    <Footer />
    {/* <div>
      {photos.map(photo => (
        <div key={photo.id}>
          <h2>{photo.title}</h2>
          <img src={photo.image} alt={photo.title} /> 
          <p>{photo.price}</p>
          <p>{photo.description}</p>
        </div>
      ))}
    </div> */}
    </>
  )
}

export default App
