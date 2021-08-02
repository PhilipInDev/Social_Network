import './Message.scss'

const Message = (props) => {
    return(
        <div className="message__wrapper">
            <div className="message">
                <p className="message__text">{props.message}</p>
                <p className="message__time">{props.time}</p>
            </div>
        </div>
    )
}

export default Message;