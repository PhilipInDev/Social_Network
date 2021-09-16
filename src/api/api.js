import axios from "axios";

const instanceAxios = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '6f32a2b4-d8b8-4517-bfb3-660238968bfb'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

const requestCommonThen = (request) => {
    return request()
        .then((response) => response.data)
}

export const UsersAPI = {
    getUsers(usersCount = 10, page = 1) {
        return instanceAxios
            .get(`users?count=${usersCount}&page=${page}`)
            .then((response) => response.data)
    },
}

export const ProfileAPI = {
    getUserProfileData(id) {
        return instanceAxios
            .get(`/profile/${id}`)
            .then((response) => response.data)
    },
    putUsersPhoto(formData) {
        return instanceAxios
            .put('/profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => response.data)
    },
    getUserStatus(id){
        return requestCommonThen(() =>
            instanceAxios
                .get(`/profile/status/${id}`)
        )
    },
    putUserStatus(status){
        return requestCommonThen( () =>
            instanceAxios
                .put('/profile/status', status)
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
    authorize(email, password, rememberMe){
        return instanceAxios
            .post('auth/login', {
                email: email,
                password: password,
                rememberMe: rememberMe,
                captcha: true
            })
            .then((response) => response.data)
    },
    unAuthorize(){
        return instanceAxios
            .delete('auth/login')
            .then((response) => response.data)
    }
}
