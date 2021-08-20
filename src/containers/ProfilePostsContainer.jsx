import ProfilePosts from "../components/Profile/ProfilePosts/ProfilePosts";
import {addPost, updateNewPostText} from "../reducers/profile";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return{
        posts: state.profile.posts,
        postsInputValue: state.profile.postsInputValue
    }
}

const ProfilePostsContainer = connect(mapStateToProps, {
    addPost,
    updateNewPostText
})(ProfilePosts)

export default ProfilePostsContainer;