import {FollowAPI, UsersAPI} from "../api/api";
import {setGlobalMessage} from "./app";

export const SET_USERS = 'SET_USERS';
export const TOGGLE_FRIEND = 'TOGGLE_FRIEND';
export const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
export const TOGGLE_IS_ADDING_FRIEND = 'TOGGLE_IS_ADDING_FRIEND';
export const TOGGLE_WHICH_FRIEND_IS_ADDING = 'TOGGLE_WHICH_FRIEND_IS_ADDING';
export const SET_SEARCH_CONDITION = 'findFriends/SET_SEARCH_CONDITION';
// -- pagination
export const SET_USERS_COUNT = 'SET_USERS_COUNT';
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
export const SET_CURRENT_PAGE = 'findFriends/SET_CURRENT_PAGE';

const initialState = {
    users: [],
    totalCount: 0,
    usersCount: 10,
    currentPage: 1,
    searchCondition: '',
    isFetching: false,
    isAddingFriend: false,
    whichFriendIsAdding: []
}

const findFriendsReducer = (state = initialState, action) => {
    switch (action.type){
        case TOGGLE_FRIEND:
            let usersMapped = state.users.map(user => user.id === action.id ? { ...user, followed: action.isFriend } : user)
            return {
                ...state,
                users: usersMapped
            }
        case SET_USERS:
            return{
                ...state,
                users: [...action.users],
            }
        case SET_USERS_COUNT:
            return {
                ...state,
                usersCount: action.usersCount
            }
        case SET_TOTAL_COUNT:
            return{
                ...state,
                totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_ADDING_FRIEND:
            return {
                ...state,
                isAddingFriend: action.isAddingFriend
            }
        case TOGGLE_WHICH_FRIEND_IS_ADDING:
            return {
                ...state,
                whichFriendIsAdding: state.isAddingFriend ? [action.id] : state.whichFriendIsAdding.filter((id) => id !== action.id)
            }
        case SET_SEARCH_CONDITION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setSearchCondition = (searchCondition) => ({
    type: SET_SEARCH_CONDITION,
    payload: {searchCondition}
})
export const toggleFriend = (id, isFriend) => ({
    type: TOGGLE_FRIEND,
    id: id,
    isFriend: isFriend
})
export const setUsers = (users) => ({
    type: SET_USERS,
    users: users,
})
export const setUsersCount = (usersCount) => ({
    type: SET_USERS_COUNT,
    usersCount: usersCount
})
export const setTotalCount = (totalCount) => ({
    type: SET_TOTAL_COUNT,
    totalCount: totalCount
})
export const setCurrentPage = (currPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage: currPage
})
export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
})
export const toggleAddingFriend = (isAddingFriend) => ({
    type: TOGGLE_IS_ADDING_FRIEND,
    isAddingFriend: isAddingFriend
})
export const toggleWhichFriendIsAdding = (userId) => ({
    type: TOGGLE_WHICH_FRIEND_IS_ADDING,
    id: userId
})

export const getUsers = (usersCount, pageNum, searchCondition = '', isOnlyFriends = 0) => async (dispatch) => {
    try{
        dispatch(setCurrentPage(pageNum));
        dispatch(toggleIsFetching(true));
        const data = await UsersAPI.getUsers(usersCount, pageNum, searchCondition, isOnlyFriends);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));
    }catch (error) {
        dispatch(setGlobalMessage(error, false))
    }

}

export const getAdditionalUsers = (usersCount, pageNum, usersAddTo, searchCondition) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    const data = await UsersAPI.getUsers(usersCount, pageNum, searchCondition);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers([...usersAddTo, ...data.items]));
    dispatch(setCurrentPage(pageNum));
}

export const postAddFriend = (id) => async (dispatch) => {
    dispatch(toggleAddingFriend(true));
    dispatch(toggleWhichFriendIsAdding(id));
    const data = await FollowAPI.postAddFriend(id);
    if(!data.resultCode){
        dispatch(toggleAddingFriend(false));
        dispatch(toggleWhichFriendIsAdding(id));
        dispatch(toggleFriend(id, true));
    }
}

export const deleteFriend = (id) => async (dispatch) => {
    dispatch(toggleAddingFriend(true));
    dispatch(toggleWhichFriendIsAdding(id));
    const data = await FollowAPI.deleteFriend(id);
    if(!data.resultCode){
        dispatch(toggleAddingFriend(false));
        dispatch(toggleWhichFriendIsAdding(id));
        dispatch(toggleFriend(id, false));
    }
}
export default findFriendsReducer;