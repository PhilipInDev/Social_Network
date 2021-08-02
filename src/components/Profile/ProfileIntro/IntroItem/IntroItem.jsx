import './IntroItem.scss'

const IntroItem = (props) => {
    return(
        <div className='intro-box__item'>
            <h4>{props.title}:</h4>
            <p>{props.text}</p>
        </div>
    )
}

export default IntroItem;