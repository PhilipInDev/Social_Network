import {ProfileAPI, ResultCodes} from "../api/api";
import {setGlobalMessage} from "./app";
import {AppThunk} from "../redux/reduxStore";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProfilePostType, UserProfileType} from "../types/types";

// const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
// const TOGGLE_IS_GETTING_PROFILE_DATA = 'profile/TOGGLE_IS_GETTING_PROFILE_DATA';
// //-- posts
// const ADD_POST = 'profile/ADD_POST';
// const UPDATE_NEW_POST_TEXT = 'profile/UPDATE_NEW_POST_TEXT';
// const SET_USER_STATUS = 'profile/SET_USER_STATUS';



const initialState = {
    title: 'Profile',
    userProfile: null as UserProfileType | null,
    userStatus: '',
    isGettingProfileData: false,
    posts: [
        {
            id: 1,
            profileLink: '#',
            name: 'Philip',
            profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
            text: 'My 1st post, guys!',
            likesCount: 17,
            commentsCount: 1,
        },
        {
            id: 2,
            profileLink: '#',
            name: 'Philip',
            profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
            text: 'My 1st post, guys!',
            likesCount: 17,
            commentsCount: 1,
        },
        {
            id: 3,
            profileLink: '#',
            name: 'Philip',
            profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
            text: 'My 1st post, guys!',
            likesCount: 17,
            commentsCount: 1,
        },
    ] as Array<ProfilePostType>,
};
// type ProfileInitialStateType = typeof initialState;

// const profileReducer = (state = initialState, action: ActionTypes): ProfileInitialStateType => {
//     switch (action.type){
//         case ADD_POST:
//             return {
//                 ...state,
//                 posts: [...state.posts, {
//                     id: state.posts.length + 1,
//                     profileLink: '#',
//                     name: action.name,
//                     profileImage: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
//                     text: state.postsInputValue,
//                     likesCount: 0,
//                     commentsCount: 0,
//                 }],
//                 postsInputValue: ''
//             };
//         case UPDATE_NEW_POST_TEXT:
//             return {
//                 ...state,
//                 postsInputValue: action.text
//             };
//         case SET_USER_PROFILE:
//             return {
//                 ...state,
//                 userProfile: action.profile
//             }
//         case SET_USER_STATUS:
//             return {
//                 ...state,
//                 userStatus: action.status
//             }
//         case TOGGLE_IS_GETTING_PROFILE_DATA:
//             return{
//                 ...state,
//                 isGettingProfileData: action.isGettingProfileData
//             }
//         default:
//             return state;
//     }
// }
// type ActionTypes = AddPostType | UpdateNewPostTextType | SetUserProfileType| SetUserStatusType | ToggleIsGettingProfileDataType |  SetGlobalMessageType;
const profileReducer = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserProfile(state, action: PayloadAction<UserProfileType>) {
            state.userProfile = action.payload
        },
        toggleIsGettingProfileData(state, action: PayloadAction<boolean>) {
            state.isGettingProfileData = action.payload
        },
        setUserStatus(state, action: PayloadAction<string>) {
            state.userStatus = action.payload
        },
        addPost(state, action: PayloadAction<ProfilePostType>) {
            state.posts.push(action.payload)
        }
    }
})
export const { setUserProfile, toggleIsGettingProfileData, setUserStatus, addPost } = profileReducer.actions;
// type AddPostType = {
//     type: typeof ADD_POST
//     name: string
// }
// export const addPost = (name: string): AddPostType => ({
//     type: ADD_POST,
//     name
// })
//
// type UpdateNewPostTextType = {
//     type: typeof UPDATE_NEW_POST_TEXT
//     text: string
// }
// export const updateNewPostText = (text: string): UpdateNewPostTextType => ({
//     type: UPDATE_NEW_POST_TEXT,
//     text
// })

// type SetUserProfileType = {
//     type: typeof SET_USER_PROFILE
//     profile: UserProfileType | null
// }
// export const setUserProfile = (profile: UserProfileType | null): SetUserProfileType => ({
//     type: SET_USER_PROFILE,
//     profile
// })
//
// type ToggleIsGettingProfileDataType = {
//     type: typeof TOGGLE_IS_GETTING_PROFILE_DATA
//     isGettingProfileData: boolean
// }
// export const toggleIsGettingProfileData = (isGettingProfileData: boolean): ToggleIsGettingProfileDataType => ({
//     type: TOGGLE_IS_GETTING_PROFILE_DATA,
//     isGettingProfileData
// })
//
// type SetUserStatusType = {
//     type: typeof SET_USER_STATUS
//     status: string
// }
// export const setUserStatus = (status: string): SetUserStatusType => ({
//     type: SET_USER_STATUS,
//     status
// })

export const getUserProfileData = (userId: number): AppThunk => async (dispatch) => {
    const profileData = await ProfileAPI.getUserProfileData(userId);
    dispatch(setUserProfile(profileData));
}

export const getUserStatus = (id: number): AppThunk => async (dispatch) => {
    try{
        const data = await ProfileAPI.getUserStatus(id);
        dispatch(setUserStatus(data));
    }catch(error: any) {
        dispatch(setGlobalMessage({message: error, isSuccess: false}))
    }

}

export const putUserStatus = (status: string): AppThunk => async (dispatch) => {
    try{
        let response = await ProfileAPI.putUserStatus(status);
        if(response.resultCode === ResultCodes.Success) dispatch(setUserStatus(status));
    }catch(error: any) {
        dispatch(setGlobalMessage({message: error, isSuccess: false}))
    }

}

export const initUserProfileWithDataInMemory = (profile: UserProfileType, status: string): AppThunk => (dispatch) => {
    dispatch(toggleIsGettingProfileData(true));
    dispatch(setUserStatus(status));
    dispatch(setUserProfile(profile));
    dispatch(toggleIsGettingProfileData(false));
}

export const initUserProfileWithoutDataInMemory = (userId: number):AppThunk => async (dispatch) => {
    try {
        dispatch(toggleIsGettingProfileData(true));
        await Promise.all([dispatch(getUserProfileData(userId)), dispatch(getUserStatus(userId))]);
        dispatch(toggleIsGettingProfileData(false));
    }catch (error: any){
        dispatch(setGlobalMessage({message: error, isSuccess: false}))
    }

}

export default profileReducer.reducer;
