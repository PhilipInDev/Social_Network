import './Message.scss'

const Message = (props) => {
    const messageDefaultClass = 'message__wrapper';
    let myMessageModifier = '--my-message';
    if(props.owner){
        myMessageModifier = '';
    }

    return(
        <div className={ `${messageDefaultClass} ${messageDefaultClass}${myMessageModifier}` }>
            <div className="message">
                <p className="message__text">{props.message}</p>
                <p className="message__time">{props.time}</p>
            </div>
        </div>
    )
}

export default Message;