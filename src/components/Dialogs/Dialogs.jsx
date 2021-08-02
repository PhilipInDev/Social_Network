import './Dialogs.scss';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageInput from "./MessageInput/MessageInput";

const Dialogs = (props) => {
    let messagesElements = props.dataSet.messages.map(el => (<Message message={el.message} time={el.time}/>));
    let dialogElements = props.dataSet.dialogItems.map(el=>(<DialogItem id={el.id} avatarLink={el.avatarLink} name={el.name} messageName={el.messageName} message={el.message}/>));
    return(
        <div className='dialogs'>
            <div className='dialogs-items'>
                {dialogElements}
            </div>
            <div className="messages-box">
                <div className="messages">
                    {messagesElements}
                </div>
                <MessageInput />
            </div>
        </div>
    )
}

export default Dialogs;