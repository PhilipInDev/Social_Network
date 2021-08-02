import './DialogItem.scss';
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    return(
        <NavLink className="dialogItem" to={'/dialogs/' + props.id}>
            <img className='dialogItem__avatar' src={props.avatarLink} />
            <div className="dialogItem__text-box">
                <p className="dialogItem__name">{props.name}</p>
                <p className="dialogItem__first-message">
                    <span className="dialogItem__first-message-name">{props.messageName}: </span>{props.message}
                </p>
            </div>
        </NavLink>
    )
}

export default DialogItem;