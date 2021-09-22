import axios from "axios";

const instanceAxios = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '766a1cb3-b0eb-40b3-b01e-c5a8e95314af'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

const requestCommonThen = (request) => {
    return request()
        .then((response) => response.data)
        .catch(error => Promise.reject(error.message))
}

export const UsersAPI = {
    getUsers(usersCount = 10, page = 1, term = '', friend = 0) {
        const nameToSearch =  term ? `&term=${term}` : '';
        const isOnlyFriends = friend === 0 ? '' : `&friend=${friend}`;
        return requestCommonThen(() =>
            instanceAxios
                .get(`users?count=${usersCount}&page=${page}${nameToSearch}${isOnlyFriends}`)
        )
    },
}

export const ProfileAPI = {
    getUserProfileData(id) {
        return instanceAxios
            .get(`profile/${id}`)
            .then((response) => response.data)
    },
    putUsersPhoto(formData) {
        return instanceAxios
            .put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => response.data)
    },
    getUserStatus(id){
        return requestCommonThen(() =>
            instanceAxios
                .get(`profile/status/${id}`)
        )
    },
    putUserStatus(status){
        return requestCommonThen(() =>
            instanceAxios
                .put('profile/status', status)
        )
    },
    putUserProfile(profileData){
        return requestCommonThen(() =>
            instanceAxios
                .put('profile', profileData)
        )
    }
}

export const FollowAPI = {
    postAddFriend(id = 1) {
        return instanceAxios
            .post(`follow/${id}`)
            .then((response) => response.data)
    },
    deleteFriend(id) {
        return instanceAxios
            .delete(`follow/${id}`)
            .then((response) => response.data)
    }
}
export const AuthAPI = {
    getAuthUserData() {
        return instanceAxios
            .get('auth/me')
            .then((response) => response.data)
    },
    authorize(email, password, rememberMe, captcha=''){
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
                .get('security/get-captcha-url')
        )
    }
}
