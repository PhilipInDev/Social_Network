import {SET_AUTH_USER_PROFILE, SET_USER_DATA, TOGGLE_AUTH} from "../constants/actionTypes";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    authorizedUserProfile: {
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null
        },
        lookingForAJob: false,
        lookingForAJobDescription: null,
        fullName: "",
        userId: null,
        photos: {
            small: null,
            large: null
        }
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case SET_AUTH_USER_PROFILE:
            return {
                ...state,
                authorizedUserProfile: action.profile
            }
        case TOGGLE_AUTH:
            return {
                ...state,
                isAuth: action.isAuth
            }
        default:
            return state;
    }
}

export const setUserData = (data) => ({
    type: SET_USER_DATA,
    data: data
})
export const setAuthUserProfile = (profile) => ({
    type: SET_AUTH_USER_PROFILE,
    profile: profile
})
export const toggleAuth = (isAuth) => ({
    type: TOGGLE_AUTH,
    isAuth: isAuth
})
export default authReducer;