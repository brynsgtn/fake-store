import { Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 mt-5">
                <img
                    alt=""
                    src={logo}
                    width="250"
                    height="250"
                    className="rounded-circle"
                />
                <p className="empty-cart-message">Error Fetching Data</p>
                <Button className="btn" variant="dark" style={{ width: '50%'}} onClick={goToHome}>Go to Home Page</Button>
        </div>
    )
};

export default NotFound;