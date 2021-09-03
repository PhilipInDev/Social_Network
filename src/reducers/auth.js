import {
    SET_AUTH_USER_PROFILE,
    SET_ME,
    TOGGLE_AUTH,
    TOGGLE_IS_AUTH_DATA_INCORRECT,
    TOGGLE_IS_AUTHORIZING
} from "../constants/actionTypes";
import {AuthAPI, ProfileAPI} from "../api/api";

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isAuthorizing: false,
    isAuthDataIncorrect: false,
    authorizedUserProfile: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ME:
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
        case TOGGLE_IS_AUTH_DATA_INCORRECT:
            return {
                ...state,
                isAuthDataIncorrect: action.isAuthDataIncorrect
            }
        case TOGGLE_IS_AUTHORIZING:
            return {
                ...state,
                isAuthorizing: action.isAuthorizing
            }
        default:
            return state;
    }
}

export const setMe = (data) => ({
    type: SET_ME,
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

export const toggleIsAuthDataIncorrect = (isIncorrect) => ({
    type: TOGGLE_IS_AUTH_DATA_INCORRECT,
    isAuthDataIncorrect: isIncorrect
})

export const toggleIsAuthorizing = (isAuthorizing) => ({
    type: TOGGLE_IS_AUTHORIZING,
    isAuthorizing: isAuthorizing
})

export const putNewUserPhotoAndRefreshProfileState = (formData, authUserId) => (dispatch) =>{
    ProfileAPI.putUsersPhoto(formData)
        .then((response)=>{
            if(!response.resultCode){
                ProfileAPI.getUserProfileData(authUserId)
                    .then((profileData) => {
                        dispatch(setAuthUserProfile(profileData));
                    })
            }
        })
}

export const getAuthUserDataAndGetSetAuthUserProfileData = () => (dispatch) => {
    dispatch(toggleIsAuthorizing(true));
    return AuthAPI.getAuthUserData()
        .then((data) => {
            if(!data.resultCode){
                dispatch(toggleAuth(true));
                dispatch(setMe(data.data));
                ProfileAPI.getUserProfileData(data.data.id)
                    .then((profileData) => {
                        dispatch(toggleIsAuthorizing(false));
                        dispatch(setAuthUserProfile(profileData));
                    })
            }
        })
}
export const getAuthUserData = () => (dispatch) => {
    dispatch(toggleIsAuthorizing(true))
    AuthAPI.getAuthUserData()
        .then((data) => {
            dispatch(toggleIsAuthorizing(false))
            if(!data.resultCode){
                dispatch(toggleAuth(true))
            }
            if(data.resultCode){
                dispatch(toggleAuth(false))
            }
        })
}

export const authorize = (email, password, rememberMe) => (dispatch) => {
    return AuthAPI.authorize(email, password, rememberMe)
        .then((data) => {
            if(!data.resultCode){
                dispatch(toggleIsAuthDataIncorrect(false));
                dispatch(getAuthUserDataAndGetSetAuthUserProfileData())
            }
            if(data.resultCode){
                dispatch(toggleIsAuthDataIncorrect(true))
            }
        })
}

export const unAuthorize = () => (dispatch) => {
    AuthAPI.unAuthorize()
        .then((data) => {
            if(!data.resultCode){
                dispatch(toggleAuth(false));
                dispatch(setAuthUserProfile(initialState.authorizedUserProfile));
                dispatch(setMe(null));
            }
        })
}

export default authReducer;