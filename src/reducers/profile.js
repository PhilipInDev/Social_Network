import {ADD_POST, SET_USER_PROFILE, UPDATE_NEW_POST_TEXT} from "../constants/actionTypes";
import {ProfileAPI} from "../api/api";

const initialState = {
    title: 'Profile',
    userProfile: null,
    posts: [
        {
            id: 1,
            profileLink: '#',
            name: 'Philip',
            profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
            text: 'My 1st post, guys!',
            likesCount: '17',
            commentsCount: '1',
        },
        {
            id: 2,
            profileLink: '#',
            name: 'Philip',
            profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
            text: 'My 1st post, guys!',
            likesCount: '17',
            commentsCount: '1',
        },
        {
            id: 3,
            profileLink: '#',
            name: 'Philip',
            profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
            text: 'My 1st post, guys!',
            likesCount: '17',
            commentsCount: '1',
        },
    ],
    postsInputValue: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: state.posts.length + 1,
                    profileLink: '#',
                    name: action.name,
                    profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
                    text: state.postsInputValue,
                    likesCount: '0',
                    commentsCount: '0',
                }],
                postsInputValue: ''
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                postsInputValue: action.text
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.profile
            }
        default:
            return state;
    }
}

export const addPost = (name) => ({
    type: ADD_POST,
    name
})
export const updateNewPostText = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    text
})
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})

export const getUserProfileData = (userId) => (dispatch) => {
    ProfileAPI.getUserProfileData(userId)
        .then((profileData) => {
            dispatch(setUserProfile(profileData))
        });
}

export default profileReducer;
