import './UserItem.scss'
import Button from "../../SharedComponents/Button";
import React from "react";
import defaultAvatar from '../../../assets/images/defaultAvatar.png'
import {NavLink} from "react-router-dom";

class UserItem extends React.Component{
    constructor(props) {
        super(props);
        this.toggleFriendBtn = React.createRef();
    }
    changeButtonInner() {
        if (this.props.isFriend)
            return 'Remove';
        else
            return 'Add Friend';
    }

    toggleFriendOnClick = () => {
        if(!this.props.isFriend){
            this.props.postAddFriend(this.props.id);
            this.changeButtonInner();
        }
        if(this.props.isFriend){
            this.props.deleteFriend(this.props.id);
            this.changeButtonInner();
        }
    }
    render(){
        return(
            <div className="user-item">
                <NavLink to={`/profile/${this.props.id}`} className="user-item__avatar-box">
                    <img src={this.props.photos.small ? this.props.photos.small : defaultAvatar} alt={this.props.name} className="user-item__avatar"/>
                    </NavLink>
                <div ref={this.toggleFriendBtn} onClick={this.toggleFriendOnClick} className='user-item__btn-wrapper'>
                    <Button inner={this.changeButtonInner()} disabled={this.props.whichFriendIsAdding.some((id) => id === this.props.id)}/>
                </div>
                <NavLink to={`/profile/${this.props.id}`} className="user-item__name">{this.props.name}</NavLink>
                {/*<p className="user-item__country">{props.location.country + ', ' + props.location.city}</p>*/}
                <p className="user-item__about">{this.props.status}</p>
            </div>
        )
    }
}

export default UserItem;