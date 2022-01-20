import axios, {AxiosResponse} from "axios";
import {UserItemType, UserProfileType} from "../types/types";

const instanceAxios = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '33944b96-dc0e-43ef-af5e-764a7198445e'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export type ResponseBox<DataType = {}, RC = ResultCodes> = {
    data: DataType
    resultCode: RC
    messages: Array<string>
}
export type GetUsersResponseType = {
    items: UserItemType[]
    totalCount: number
    error: string
}
export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaRequired = 10
}
const requestCommonThen = (request: Function) => {
    return request()
        .then((response: AxiosResponse) => response.data)
        .catch((error: any) => Promise.reject(error.message))
}

export const UsersAPI = {
    getUsers(usersCount = 10, page = 1, term: string | null, friend: boolean | string | null) {
        const nameToSearch =  term ? `&term=${term}` : '';
        const isOnlyFriends = friend === null ? '' : `&friend=${friend}`;
        return requestCommonThen(() =>
            instanceAxios
                .get<GetUsersResponseType>(`users?count=${usersCount}&page=${page}${nameToSearch}${isOnlyFriends}`)
        )
    },
}

export const ProfileAPI = {
    getUserProfileData(id: number) {
        return instanceAxios
            .get<UserProfileType>(`profile/${id}`)
            .then((response) => response.data)
    },
    putUsersPhoto(formData: FormData) {
        return instanceAxios
            .put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => response.data)
    },
    getUserStatus(id: number){
        return requestCommonThen(() =>
            instanceAxios
                .get<ResponseBox<string>>(`profile/status/${id}`)
        )
    },
    putUserStatus(status: string){
        return requestCommonThen(() =>
            instanceAxios
                .put('profile/status', {status})
        )
    },
    putUserProfile(profileData: UserProfileType){
        return requestCommonThen(() =>
            instanceAxios
                .put('profile', profileData)
        )
    }
}

export const FollowAPI = {
    postAddFriend(id: number = 1) {
        return instanceAxios
            .post(`follow/${id}`)
            .then((response) => response.data)
    },
    deleteFriend(id: number) {
        return instanceAxios
            .delete(`follow/${id}`)
            .then((response) => response.data)
    }
}
export const AuthAPI = {
    getAuthUserData() {
        return instanceAxios
            .get<ResponseBox<{id: number
                email: string
                login: string}>>('auth/me')
            .then((response) => response.data)
    },
    authorize(email: string, password: string, rememberMe: boolean, captcha: string = ''){
        return instanceAxios
            .post('auth/login', {
                email: email,
                password: password,
                rememberMe: rememberMe,
                captcha: captcha
            })
            .then((response) => response.data)
    },
    unAuthorize(){
        return instanceAxios
            .delete('auth/login')
            .then((response) => response.data)
    }
}
export const SecurityAPI = {
    getCaptcha(){
        return requestCommonThen(() =>
            instanceAxios
                .get<ResponseBox<{url: string}>>('security/get-captcha-url')
        )
    }
}
