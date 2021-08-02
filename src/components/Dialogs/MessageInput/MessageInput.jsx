import './MessageInput.scss'
import Button from "../../SharedComponents/Button";

const MessageInput = () => {
    return(
        <div className="message-input">
            <textarea id="" cols="40" rows="10" placeholder='Write your message...' className="message-input__textarea"></textarea>
            <Button inner='Send' />
        </div>
    )
}

export default MessageInput;