import {AuthAPI, ProfileAPI, ResultCodes, SecurityAPI} from "../api/api";
import {setGlobalMessage} from "./app";
import {UserProfileType} from "../types/types";
import {AppThunk} from "../redux/reduxStore";

export const SET_ME = 'SET_USER_DATA';
export const SET_AUTH_USER_PROFILE = 'SET_AUTH_USER_PROFILE';
export const TOGGLE_AUTH = 'TOGGLE_AUTH';
export const TOGGLE_IS_AUTH_DATA_INCORRECT = 'TOGGLE_IS_AUTH_DATA_INCORRECT';
export const TOGGLE_IS_AUTHORIZING = 'TOGGLE_IS_AUTHORIZING';
export const SET_AUTH_USER_STATUS = 'SET_AUTH_USER_STATUS';
export const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    captchaURL: null as string | null,
    isAuth: false as boolean,
    isAuthorizing: false as boolean,
    isAuthDataIncorrect: false as boolean,
    authorizedUserProfile: null as UserProfileType | null,
    authUserStatus: '' as string
}
type AuthInitialStateType = typeof initialState;

const authReducer = (state = initialState, action: AuthActionTypes): AuthInitialStateType=> {
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
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: action.captchaURL
            }
        default:
            return state;
    }
}
type AuthActionTypes = SetMeType | SetAuthUserProfileType | ToggleAuthType | ToggleIsAuthDataIncorrectType | ToggleIsAuthorizingType | SetAuthUserStatusType | SetCaptchaURLType;

type SetMeDataType = {
    id: number | null
    email: string | null
    login: string | null
}
type SetMeType = {
    type: typeof SET_ME
    data: SetMeDataType | null
}
export const setMe = (data: SetMeDataType | null): SetMeType => ({
    type: SET_ME,
    data
})
type SetAuthUserProfileType = {
    type: typeof SET_AUTH_USER_PROFILE
    profile: UserProfileType | null
}
export const setAuthUserProfile = (profile: UserProfileType | null): SetAuthUserProfileType => ({
    type: SET_AUTH_USER_PROFILE,
    profile
})
type ToggleAuthType = {
    type: typeof TOGGLE_AUTH
    isAuth: boolean
}
export const toggleAuth = (isAuth: boolean): ToggleAuthType => ({
    type: TOGGLE_AUTH,
    isAuth
})
type ToggleIsAuthDataIncorrectType = {
    type: typeof TOGGLE_IS_AUTH_DATA_INCORRECT
    isAuthDataIncorrect: boolean
}
export const toggleIsAuthDataIncorrect = (isIncorrect: boolean): ToggleIsAuthDataIncorrectType => ({
    type: TOGGLE_IS_AUTH_DATA_INCORRECT,
    isAuthDataIncorrect: isIncorrect
})
type ToggleIsAuthorizingType = {
    type: typeof TOGGLE_IS_AUTHORIZING
    isAuthorizing: boolean
}
export const toggleIsAuthorizing = (isAuthorizing: boolean): ToggleIsAuthorizingType => ({
    type: TOGGLE_IS_AUTHORIZING,
    isAuthorizing
})
type SetAuthUserStatusType = {
    type: typeof SET_AUTH_USER_STATUS
    authUserStatus: string
}
export const setAuthUserStatus = (authUserStatus: string): SetAuthUserStatusType => ({
    type: SET_AUTH_USER_STATUS,
    authUserStatus
})
type SetCaptchaURLType = {
    type: typeof SET_CAPTCHA_URL
    captchaURL: string
}
export const setCaptchaURL = (captchaURL: string): SetCaptchaURLType =>({
    type: SET_CAPTCHA_URL,
    captchaURL
})

export const putNewUserPhotoAndRefreshProfileState = (formData: FormData, authUserId: number):AppThunk => (dispatch) =>{
    ProfileAPI.putUsersPhoto(formData)
        .then((response)=>{
            if(response.resultCode === ResultCodes.Success){
                ProfileAPI.getUserProfileData(authUserId)
                    .then((profileData) => {
                        dispatch(setAuthUserProfile(profileData));
                    })
            }
        })
}

export const getAuthUserDataAndGetSetAuthUserProfileData = ():AppThunk => async (dispatch) => {
    dispatch(toggleIsAuthorizing(true));
    let data = await AuthAPI.getAuthUserData()
    if(data.resultCode === ResultCodes.Success) {
        dispatch(toggleAuth(true));
        dispatch(setMe(data.data));
        let profileData = await ProfileAPI.getUserProfileData(data.data.id);
        let status = await ProfileAPI.getUserStatus(data.data.id);
        dispatch(setAuthUserProfile(profileData));
        dispatch(setAuthUserStatus(status));
    }
    dispatch(toggleIsAuthorizing(false));
}
export const getAuthUserData = ():AppThunk => (dispatch) => {
    dispatch(toggleIsAuthorizing(true))
    AuthAPI.getAuthUserData()
        .then((data) => {
            dispatch(toggleIsAuthorizing(false))
            if(data.resultCode === ResultCodes.Success){
                dispatch(toggleAuth(true))
            }
            if(data.resultCode){
                dispatch(toggleAuth(false))
            }
        })
}

export const authorize = (email: string, password: string, rememberMe: boolean, captcha: string):AppThunk => (dispatch) => {
    return AuthAPI.authorize(email, password, rememberMe, captcha)
        .then((data) => {
            if(data.resultCode === ResultCodes.Success){
                dispatch(toggleIsAuthDataIncorrect(false));
                dispatch(getAuthUserDataAndGetSetAuthUserProfileData());
                return Promise.resolve(data.messages);
            }
            if(data.resultCode){
                if(data.resultCode === ResultCodes.CaptchaRequired){
                    dispatch(getCaptchaURL())
                }
                dispatch(toggleIsAuthDataIncorrect(true))
                return Promise.reject(data.messages);
            }
        })
}

export const unAuthorize = ():AppThunk => (dispatch) => {
    AuthAPI.unAuthorize()
        .then((data) => {
            if (data.resultCode === ResultCodes.Success) {
                dispatch(toggleAuth(false));
                dispatch(setAuthUserProfile(initialState.authorizedUserProfile));
                dispatch(setMe(null));
            }
        })
}
export const refreshAuthUserProfileData = (profileData: UserProfileType):AppThunk => async (dispatch) => {
    try {
        const dataResult = await ProfileAPI.putUserProfile(profileData)
        if (dataResult.resultCode === ResultCodes.Success) {
            const authUserData = await AuthAPI.getAuthUserData();
            const authUserProfileData = await ProfileAPI.getUserProfileData(authUserData.data.id);
            dispatch(setAuthUserProfile(authUserProfileData));
            dispatch(setGlobalMessage({message: 'Profile update is successful', isSuccess: true}));
        }
    } catch (error: any) {
        dispatch(setGlobalMessage({message: error, isSuccess: false}));
    }
}

export const getCaptchaURL = ():AppThunk => async (dispatch) => {
    try {
        const response = await SecurityAPI.getCaptcha();
        dispatch(setCaptchaURL(response.url))
    }catch (error: any){
        dispatch(setGlobalMessage({message: error, isSuccess: false}))
    }

}

export default authReducer;