import './ShowMoreBtn.scss'

const ShowMoreBtn = () => {
    return(
        <div className='show-more-btn'>
            <button className="show-more-btn__btn">
                <i className="fas fa-redo" />
                <p>Show more</p>
            </button>
        </div>
    )
}

export default ShowMoreBtn;