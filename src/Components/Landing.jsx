import './../Styles/Landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div className='background-container overlay'>
            <header className='fw-bold fs-1 text-center'>Welcome to ShopSmart!</header>
            <p className='w-80 w-sm-50 p-3 text-center mt-2'>Smart Choices, Smart Savings.</p>
            <Link className='btn btn-outline-light' to="/products">Shop Now</Link>
        </div>
    )
}