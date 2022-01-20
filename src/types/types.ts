
export type GlobalMessageType = {
    message: string
    isSuccess: boolean
}
export type UserItemType = {
    id: number
    name: string
    status: string
    photos: UserProfilePhotosType
    followed: boolean
}
export type SearchConditionsType = {
    term: string
    isOnlyFriends: boolean | null
}
export type UserProfileContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type UserProfilePhotosType = {
    small: string | null
    large: string | null
}
export type UserProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: UserProfileContactsType
    photos: UserProfilePhotosType
}
export type ProfilePostType = {
    id: number
    profileLink: string
    name: string
    profileImage: string | null,
    text: string,
    likesCount: number,
    commentsCount: number,
}
export type UsersData = {
    items: Array<UserItemType>
    totalCount: number
    error: string
}