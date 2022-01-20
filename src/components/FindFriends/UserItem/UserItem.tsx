import './UserItem.scss'
import Button from "../../SharedComponents/Button";
import React, {FC, useRef} from "react";
import defaultAvatar from '../../../assets/images/defaultAvatar.png'
import {NavLink} from "react-router-dom";
import {UserItemType} from "../../../types/types";

type UserItemProps = UserItemType & {
    whichFriendIsAdding: Array<number>
    postAddFriend: Function
    deleteFriend: Function
}
const UserItem: FC<UserItemProps> = (props) => {
    const toggleFriendBtn = useRef<HTMLDivElement>(null);
    const changeButtonInner = (): string => {
        if (props.followed)
            return 'Remove';
        else
            return 'Add Friend';
    }

    const toggleFriendOnClick = () => {
        if(!props.followed){
            props.postAddFriend(props.id);
            changeButtonInner();
        }
        if(props.followed){
            props.deleteFriend(props.id);
            changeButtonInner();
        }
    }
    return(
        <div className="user-item">
            <NavLink to={`/profile/${props.id}`} className="user-item__avatar-box">
                <img src={props.photos.small ? props.photos.small : defaultAvatar} alt={props.name} className="user-item__avatar"/>
                </NavLink>
            <div ref={toggleFriendBtn} onClick={toggleFriendOnClick} className='user-item__btn-wrapper'>
                <Button inner={changeButtonInner()} disabled={props.whichFriendIsAdding.some((id: number) => id === props.id)}/>
            </div>
            <NavLink to={`/profile/${props.id}`} className="user-item__name">{props.name}</NavLink>
            {/*<p className="user-item__country">{props.location.country + ', ' + props.location.city}</p>*/}
            <p className="user-item__about">{props.status}</p>
        </div>
    )
    
}

export default UserItem;