import './../Styles/Landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div className='background-container overlay'>
            <header className='fw-bold fs-1 text-center'>Shop Fashion, Tech, Backpacks</header>
            <p className='w-80 w-sm-50 p-3 text-center mt-2'>Explore stylish clothing, elegant jewelry, cutting-edge gadgets, and versatile backpacks at FakeStore, showcasing diversity and quality.</p>
            <Link className='btn btn-outline-light' to="/Products">Shop Now</Link>
        </div>
    )
}