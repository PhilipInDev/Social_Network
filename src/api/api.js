import axios from "axios";

const instanceAxios = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '0b787501-60fb-4d98-abcc-ccdba70f8547'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})


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
            .get(`profile/${id}`)
            .then((response) => response.data)
    },
    putUsersPhoto(img) {
        return instanceAxios
            .put('/profile/photo', img, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => response.data)
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
