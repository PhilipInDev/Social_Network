import {ProfileAPI} from "../api/api";

export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const TOGGLE_IS_GETTING_PROFILE_DATA = 'TOGGLE_IS_GETTING_PROFILE_DATA';
//-- posts
export const ADD_POST = 'ADD_POST';
export const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
export const SET_USER_STATUS = 'SET_USER_STATUS';

const initialState = {
    title: 'Profile',
    userProfile: null,
    userStatus: '',
    isGettingProfileData: false,
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
        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.status
            }
        case TOGGLE_IS_GETTING_PROFILE_DATA:
            return{
                ...state,
                isGettingProfileData: action.isGettingProfileData
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

export const toggleIsGettingProfileData = (isGettingProfileData) => ({
    type: TOGGLE_IS_GETTING_PROFILE_DATA,
    isGettingProfileData
})

export const getUserProfileData = (userId) => async (dispatch) => {
    const profileData = await ProfileAPI.getUserProfileData(userId);
    dispatch(setUserProfile(profileData));
}

export const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status
})

export const getUserStatus = (id) => async (dispatch) => {
    const data = await ProfileAPI.getUserStatus(id);
    dispatch(setUserStatus(data));
}

export const putUserStatus = (status) => (dispatch) => {
    dispatch(setUserStatus(status.status));
    ProfileAPI.putUserStatus(status);
}

export const initUserProfileWithDataInMemory = (profile, status) => (dispatch) => {
    dispatch(toggleIsGettingProfileData(true));
    dispatch(setUserStatus(status));
    dispatch(setUserProfile(profile));
    dispatch(toggleIsGettingProfileData(false));
}

export const initUserProfileWithoutDataInMemory = (userId) => async (dispatch) => {
    dispatch(toggleIsGettingProfileData(true));
    await Promise.all([dispatch(getUserProfileData(userId)), dispatch(getUserStatus(userId))]);
    dispatch(toggleIsGettingProfileData(false));
}

export default profileReducer;
