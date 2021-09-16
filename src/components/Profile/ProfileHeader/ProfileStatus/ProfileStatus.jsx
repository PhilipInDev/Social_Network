import './ProfileStatus.scss';
import React, {useRef, useState} from "react";

const ProfileStatus = (props) => {
    let [isStatusEditing, toggleStatusEditing] = useState(false);
    let [localStatus, setLocalStatus] = useState('');
    let statusInputBoxRef = useRef();
    const putUserStatusAndToggleStatusEditing = () => {
        if(props.userStatus !== localStatus){
            props.putUserStatus({ status: localStatus });
        }
        toggleStatusEditing(false);
    }
    // useOutsideAlerter(statusInputBoxRef, putUserStatusAndToggleStatusEditing);

    const submitStatusChanges = () => {
        putUserStatusAndToggleStatusEditing();
    }
    const editStatusOnClick = () => {
        setLocalStatus(props.userStatus);
        toggleStatusEditing(true);
    }
    return (
        <>
            {props.statusEditable &&
            <div className="profile-status__status-box" ref={statusInputBoxRef}>
                {isStatusEditing
                    ? <>
                        <input autoFocus type={"text"} className="profile-status__status-input"
                               onChange={(e) => setLocalStatus(e.target.value)}
                               value={localStatus}
                               onKeyDown={(e) => {
                                   if(e.key === 'Enter') submitStatusChanges();
                               }}
                        />
                        <button className="profile-status__status-btn" onClick={submitStatusChanges}>
                            <i className="fas fa-check-circle"/>
                        </button>
                    </>
                    : <>
                        <p className="profile-status__status"
                           onDoubleClick={editStatusOnClick}
                           title={props.userStatus}
                        >
                            {props.userStatus ? props.userStatus : 'Your Status'}
                        </p>
                        <button className="profile-status__status-btn" onClick={editStatusOnClick}>
                            <i className="far fa-edit" />
                        </button>
                    </>
                }
            </div>
            }
            {!props.statusEditable &&
            <p className='profile-status__status' title={props.userStatus}>{props.userStatus}</p>
            }
        </>
    )
}

export default ProfileStatus;