import ProfilePosts from "../components/Profile/ProfilePosts/ProfilePosts";
import {addPost} from "../reducers/profile";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return{
        posts: state.profile.posts
    }
}

const ProfilePostsContainer = connect(mapStateToProps, {
    addPost
})(ProfilePosts)

export default ProfilePostsContainer;