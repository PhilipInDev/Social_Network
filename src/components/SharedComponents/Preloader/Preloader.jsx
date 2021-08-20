import './Preloader.css'

const Preloader = () => {
    return(
        <main className='preloader__box'>
            <div className="preloader">
                <div className="preloader__square"></div>
                <div className="preloader__square"></div>
                <div className="preloader__square"></div>
                <div className="preloader__square"></div>
            </div>
            <div className="status">Loading<span className="status__dot">.</span><span
                className="status__dot">.</span><span className="status__dot">.</span></div>
        </main>
    )
}

export default Preloader;