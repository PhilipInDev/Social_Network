import './MessageInput.scss'
import React from "react";
import Button from "../../SharedComponents/Button";

const MessageInput = (props) => {
    let textAreaEl = React.createRef();
    const textAreaOnChange = () => {
        props.textAreaOnChange(textAreaEl)
    }
    const sendMessageOnClick = () => {
        props.sendMessage(props.messageInputValue)
    }
    return(
        <div className="message-input">
            <textarea ref={textAreaEl}
                      cols="40"
                      rows="10"
                      placeholder='Write your message...'
                      className="message-input__textarea"
                      value={props.messageInputValue}
                      onChange={textAreaOnChange}
            />
            <div onClick={sendMessageOnClick}>
                <Button textareaEl={textAreaEl} inner='Send' />
            </div>
        </div>
    )
}

export default MessageInput;