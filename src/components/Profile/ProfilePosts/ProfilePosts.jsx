import './ProfilePosts.scss';
import Post from "./Post/Post";
import Button from "../../SharedComponents/Button";
import React from "react";

const ProfilePosts = (props) => {

    let fulledPosts = props.posts.map(el=>(
            <Post profileLink={el.profileLink}
              name={el.name}
              profileImage={el.profileImage}
              text={el.text}
              likesCount={el.likesCount}
              commentsCount={el.commentsCount}
            />
        ))
    let textAreaEl = React.createRef();
    const addPost = () =>{
        props.addPost()
    }
    const textAreaOnChange = () => {
        props.textAreaOnChange(textAreaEl.current.value)
    }
    //buttons goes away when clicked
    // const textAreaOnFocus = () => {
    //   textAreaEl.current.classList.add('profile-posts__input--is-focused')
    // }
    // const textAreaOnBlur = (e) => {
    //     console.log(e.target.className)
    //     if(!e.target.className.includes('profile-posts__input-textarea') && e.target.tagName !== 'BUTTON') {
    //         textAreaEl.current.classList.remove('profile-posts__input--is-focused')
    //     }
    // }
    return(
        <div className='profile-posts'>
            <div className='profile-posts__input'>
                <textarea className='profile-posts__input-textarea' onChange={textAreaOnChange} value={props.postsInputValue} placeholder='Write your post...' ref={textAreaEl}/>
                <div onClick={addPost}>
                    <Button inner='Post' />
                </div>

            </div>
            {fulledPosts}
        </div>
    )
}

export default ProfilePosts;