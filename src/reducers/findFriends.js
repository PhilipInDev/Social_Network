import {
    SET_CURRENT_PAGE,
    SET_TOTAL_COUNT,
    SET_USERS,
    SET_USERS_COUNT,
    TOGGLE_FRIEND, TOGGLE_IS_ADDING_FRIEND, TOGGLE_IS_FETCHING, TOGGLE_WHICH_FRIEND_IS_ADDING
} from "../constants/actionTypes";
import {FollowAPI, UsersAPI} from "../api/api";

const initialState = {
    users: [],
    totalCount: 0,
    usersCount: 10,
    currentPage: 1,
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
        default:
            return state;
    }
}

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

export const getUsers = (usersCount, pageNum) => (dispatch) => {
    dispatch(setCurrentPage(pageNum));
    dispatch(toggleIsFetching(true));
    UsersAPI.getUsers(usersCount, pageNum)
        .then((data) => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalCount(data.totalCount));
        });
}

export const getAdditionalUsers = (usersCount, pageNum, usersAddTo) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    UsersAPI.getUsers(usersCount, pageNum)
        .then((data) => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers([...usersAddTo, ...data.items]));
            dispatch(setCurrentPage(pageNum));
        });
}

export const postAddFriend = (id) => (dispatch) => {
    dispatch(toggleAddingFriend(true));
    dispatch(toggleWhichFriendIsAdding(id));
    FollowAPI.postAddFriend(id)
        .then((data) => {
            if(!data.resultCode){
                dispatch(toggleAddingFriend(false));
                dispatch(toggleWhichFriendIsAdding(id));
                dispatch(toggleFriend(id, true));
            }
        })
}

export const deleteFriend = (id) => (dispatch) => {
    dispatch(toggleAddingFriend(true));
    dispatch(toggleWhichFriendIsAdding(id));
    FollowAPI.deleteFriend(id)
        .then((data) => {
            if(!data.resultCode){
                dispatch(toggleAddingFriend(false));
                dispatch(toggleWhichFriendIsAdding(id));
                dispatch(toggleFriend(id, false));
            }
        })
}
export default findFriendsReducer;