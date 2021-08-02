import './Post.scss';

const Post = (props) => {
    return(
        <div className='post'>
            <div className='post__header'>
                <a href={props.profileLink}>
                    <img alt='profile' src={props.profileImage} />
                </a>
                <a href={props.profileLink}>
                    <span>{props.name}</span>
                </a>
            </div>
            <div className='post__inner'>
                <p>{props.text}</p>
            </div>
            <div className='post__footer'>
                <div className='post__mark'>
                    <button><i className="far fa-heart"></i></button>
                    <span className='post__mark'>{props.likesCount}</span>
                </div>
                <div className='post__mark'>
                    <button><i className="far fa-comments"></i></button>
                    <span className='post__comments-count'>{props.commentsCount}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;