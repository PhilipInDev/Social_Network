import {FollowAPI, ResultCodes, UsersAPI} from "../api/api";
import {setGlobalMessage} from "./app";
import {AppThunk} from "../redux/reduxStore";
import {SearchConditionsType, UserItemType, UsersData} from "../types/types";

const SET_USERS = 'findFriends/SET_USERS';
const TOGGLE_FRIEND = 'findFriends/TOGGLE_FRIEND';
const TOGGLE_IS_FETCHING = 'findFriends/TOGGLE_IS_FETCHING';
const TOGGLE_IS_ADDING_FRIEND = 'findFriends/TOGGLE_IS_ADDING_FRIEND';
const TOGGLE_WHICH_FRIEND_IS_ADDING = 'findFriends/TOGGLE_WHICH_FRIEND_IS_ADDING';
const SET_SEARCH_CONDITION = 'findFriends/SET_SEARCH_CONDITION';
// -- pagination
const SET_USERS_COUNT = 'findFriends/SET_USERS_COUNT';
const SET_TOTAL_COUNT = 'findFriends/SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'findFriends/SET_CURRENT_PAGE';

const initialState = {
    users: [] as Array<UserItemType>,
    totalCount: 0 as number,
    usersCount: 10 as number,
    currentPage: 1 as number,
    searchConditions: {
        term: '',
        isOnlyFriends: null
    } as SearchConditionsType,
    isFetching: false as boolean,
    isAddingFriend: false as boolean,
    whichFriendIsAdding: [] as Array<number>
}
type FindFriendsInitialStateType = typeof initialState;

const findFriendsReducer = (state = initialState, action: FindFriendsActionTypes): FindFriendsInitialStateType => {
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
                searchConditions: {...state.searchConditions, ...action.payload}
            }
        default:
            return state;
    }
}
type FindFriendsActionTypes = ToggleFriendType | SetUsersType | SetUsersCountType | SetTotalCountType | SetCurrentPageType | ToggleIsFetchingType | ToggleAddingFriendType | ToggleWhichFriendIsAddingType | SetSearchConditionType;

type SetSearchConditionType = {
    type: typeof SET_SEARCH_CONDITION,
    payload: SetSearchConditionArgType
}
type SetSearchConditionArgType = {
    term?: string
    isOnlyFriends?: boolean | null
}
export const setSearchConditions = (searchConditions: SetSearchConditionArgType): SetSearchConditionType => ({
    type: SET_SEARCH_CONDITION,
    payload: searchConditions
})
type ToggleFriendType = {
    type: typeof TOGGLE_FRIEND
    id: number
    isFriend: boolean
}
export const toggleFriend = (id: number, isFriend: boolean): ToggleFriendType => ({
    type: TOGGLE_FRIEND,
    id: id,
    isFriend: isFriend
})
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserItemType>
}
export const setUsers = (users: Array<UserItemType>): SetUsersType => ({
    type: SET_USERS,
    users: users,
})
type SetUsersCountType = {
    type: typeof SET_USERS_COUNT
    usersCount: number
}
export const setUsersCount = (usersCount: number): SetUsersCountType => ({
    type: SET_USERS_COUNT,
    usersCount: usersCount
})
type SetTotalCountType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalCount = (totalCount: number): SetTotalCountType => ({
    type: SET_TOTAL_COUNT,
    totalCount: totalCount
})
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage: currPage
})
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
})
type ToggleAddingFriendType = {
    type: typeof TOGGLE_IS_ADDING_FRIEND
    isAddingFriend: boolean
}
export const toggleAddingFriend = (isAddingFriend: boolean): ToggleAddingFriendType => ({
    type: TOGGLE_IS_ADDING_FRIEND,
    isAddingFriend: isAddingFriend
})
type ToggleWhichFriendIsAddingType = {
    type: typeof TOGGLE_WHICH_FRIEND_IS_ADDING
    id: number
}
export const toggleWhichFriendIsAdding = (userId: number): ToggleWhichFriendIsAddingType => ({
    type: TOGGLE_WHICH_FRIEND_IS_ADDING,
    id: userId
})

export const getUsers = (usersCount: number,
                         pageNum: number,
                         term: string,
                         isOnlyFriends: boolean | string | null): AppThunk =>
    async (dispatch) => {
    try{
        dispatch(setCurrentPage(pageNum));
        dispatch(toggleIsFetching(true));
        let data: UsersData = await UsersAPI.getUsers(usersCount, pageNum, term, isOnlyFriends);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalCount(data.totalCount));
    }catch (error: any) {
        dispatch(setGlobalMessage({message: error, isSuccess: false}))
    }
}

export const getAdditionalUsers = (usersCount: number,
                                   pageNum: number,
                                   usersAddTo: Array<UserItemType>,
                                   term: string,
                                   isOnlyFriends: boolean  | null): AppThunk =>
    async (dispatch) => {
    try{
        dispatch(setCurrentPage(pageNum));
        dispatch(toggleIsFetching(true));
        let data: UsersData = await UsersAPI.getUsers(usersCount, pageNum, term, isOnlyFriends);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers([...usersAddTo, ...data.items]));
    }catch (error: any) {
        dispatch(setGlobalMessage({message: error, isSuccess: false}))
    }
}

export const postAddFriend = (id: number): AppThunk =>
    async (dispatch) => {
    dispatch(toggleAddingFriend(true));
    dispatch(toggleWhichFriendIsAdding(id));
    const data = await FollowAPI.postAddFriend(id);
    if(data.resultCode === ResultCodes.Success){
        dispatch(toggleAddingFriend(false));
        dispatch(toggleWhichFriendIsAdding(id));
        dispatch(toggleFriend(id, true));
    }
}

export const deleteFriend = (id: number): AppThunk => async (dispatch) => {
    dispatch(toggleAddingFriend(true));
    dispatch(toggleWhichFriendIsAdding(id));
    const data = await FollowAPI.deleteFriend(id);
    if(data.resultCode === ResultCodes.Success){
        dispatch(toggleAddingFriend(false));
        dispatch(toggleWhichFriendIsAdding(id));
        dispatch(toggleFriend(id, false));
    }
}
export default findFriendsReducer;