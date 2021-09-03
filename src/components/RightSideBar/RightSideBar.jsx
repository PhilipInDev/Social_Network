import './RightSideBar.scss'
import FriendItem from "./FriendItem/FriendItem";

const RightSideBar = (props) => {
    if(!props.isAuth) return null;

    let friendsList = props.data.friendsList.map(friend=><FriendItem
            avatar={friend.avatar}
            name={friend.name}
            isOnline={friend.isOnline}
        />
    )
    return(
        <div className="right-side-bar">
            {friendsList}
        </div>
    )
}

export default RightSideBar;