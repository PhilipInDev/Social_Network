import './Dialogs.scss';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import MessageInputContainer from "../../containers/MessageInputContainer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const Dialogs = (props) => {
    let state = props.state;
    let messagesElements = state.dialogs.messages.map(el => (<Message message={el.message} time={el.time} owner={el.owner}/>));
    let dialogElements = state.dialogs.dialogItems.map(el=>(<DialogItem id={el.id} avatarLink={el.avatarLink} name={el.name} messageName={el.messageName} message={el.message}/>));
    return(
        <div className='dialogs'>
            <div className='dialogs-items'>
                {dialogElements}
            </div>
            <div className="messages-box">
                <div className="messages">
                    {messagesElements}
                </div>
                <MessageInputContainer store={props.store} />
            </div>
        </div>
    )
}

export default withAuthRedirect(Dialogs);