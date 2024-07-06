

const PageNotFound = () => {
    
    
    return(
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 mt-5">
                <img
                    alt=""
                    src={logo}
                    width="250"
                    height="250"
                    className="rounded-circle"
                />
                <h1 className="empty-cart-message">Page Not Found</h1>
        </div>
    )
}

export default PageNotFound;