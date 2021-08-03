import './FriendItem.scss'

const FriendItem = (props) => {
    let isOnline = '';
    if(props.isOnline){
        isOnline = 'online'
    }
    return(
        <div className="friend-item">
            <img src={props.avatar} alt={props.name} className="friend-item__avatar"/>
            <div className={`friend-item__is-online friend-item__${isOnline}`} />
        </div>
    )
}

export default FriendItem;