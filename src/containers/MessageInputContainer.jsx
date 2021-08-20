import MessageInput from "../components/Dialogs/MessageInput/MessageInput";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../reducers/dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return{
        messageInputValue: state.dialogs.messageInputValue
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (messageInputValue) => {
            if (messageInputValue) {
                let date = new Date();
                let action = sendMessageActionCreator(messageInputValue, date.toLocaleTimeString('en-GB',                   {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                );
                dispatch(action);
            }
        },
        textAreaOnChange: (textAreaEl) => {
            dispatch(updateNewMessageTextActionCreator(textAreaEl.current.value));
        }
    }
}
const MessageInputContainer = connect(mapStateToProps, mapDispatchToProps)(MessageInput);

export default MessageInputContainer;