import {AuthAPI, ProfileAPI} from "../api/api";

export const SET_ME = 'SET_USER_DATA';
export const SET_AUTH_USER_PROFILE = 'SET_AUTH_USER_PROFILE';
export const TOGGLE_AUTH = 'TOGGLE_AUTH';
export const TOGGLE_IS_AUTH_DATA_INCORRECT = 'TOGGLE_IS_AUTH_DATA_INCORRECT';
export const TOGGLE_IS_AUTHORIZING = 'TOGGLE_IS_AUTHORIZING';
export const SET_AUTH_USER_STATUS = 'SET_AUTH_USER_STATUS';

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isAuthorizing: false,
    isAuthDataIncorrect: false,
    authorizedUserProfile: null,
    authUserStatus: ''
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
        case SET_AUTH_USER_STATUS:
            return{
                ...state,
                authUserStatus: action.authUserStatus
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

export const setAuthUserStatus = (authUserStatus) => ({
    type: SET_AUTH_USER_STATUS,
    authUserStatus: authUserStatus
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

export const getAuthUserDataAndGetSetAuthUserProfileData = () => async (dispatch) => {
    dispatch(toggleIsAuthorizing(true));
    let data = await AuthAPI.getAuthUserData()
    if(!data.resultCode) {
        dispatch(toggleAuth(true));
        dispatch(setMe(data.data));
        let profileData = await ProfileAPI.getUserProfileData(data.data.id);
        let status = await ProfileAPI.getUserStatus(data.data.id);
        dispatch(setAuthUserProfile(profileData));
        dispatch(setAuthUserStatus(status));
    }
    dispatch(toggleIsAuthorizing(false));
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
            if (!data.resultCode) {
                dispatch(toggleAuth(false));
                dispatch(setAuthUserProfile(initialState.authorizedUserProfile));
                dispatch(setMe(null));
            }
        })
}
export const refreshAuthUserProfileData = (profileData) => async (dispatch) => {
    const dataResult = await ProfileAPI.putUserProfile(profileData)
    if(!dataResult.resultCode){
        const authUserData = await AuthAPI.getAuthUserData();
        const authUserProfileData = await ProfileAPI.getUserProfileData(authUserData.data.id);
        dispatch(setAuthUserProfile(authUserProfileData));
    }
}

export default authReducer;