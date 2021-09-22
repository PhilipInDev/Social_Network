import './GlobalMessage.scss';

const GlobalMessage = ({message, removeMessageFunc, isSuccess}) => {
    return(
        <div className="global-message">
            <div className="global-message__box">
                <span className="global-message__message">{message}</span>
                <button className="global-message__btn-close" type={"button"} onClick={() => removeMessageFunc()}/>
            </div>
            {isSuccess ? <style type={"text/css"}>{`.global-message{
                background-color: #b9ffb9;
            }`}</style> : null}
        </div>
    )
}

export default GlobalMessage;