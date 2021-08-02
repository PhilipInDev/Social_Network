import './ProfilePosts.scss';
import Post from "./Post/Post";
import Button from "../../SharedComponents/Button";

const ProfilePosts = (props) => {

    let fulledPosts = props.postsData.map(el=>(
            <Post profileLink={el.profileLink}
              name={el.name}
              profileImage={el.profileImage}
              text={el.text}
              likesCount={el.likesCount}
              commentsCount={el.commentsCount}
            />
        ))
    return(
        <div className='profile-posts'>
            <div className='profile-posts__input'>
                <textarea placeholder='Write your post...' />
                <Button inner='Post' />
            </div>
            {fulledPosts}
            <Post profileLink='#'
                  name='Philip'
                  profileImage='https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg'
                  text='My 1st post, guys!'
                  likesCount='17'
                  commentsCount='1'
            />
        </div>
    )
}

export default ProfilePosts;