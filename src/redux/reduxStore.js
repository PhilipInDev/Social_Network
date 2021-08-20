import {combineReducers, createStore} from 'redux';
import dialogsReducer from "../reducers/dialogs";
import profileReducer from "../reducers/profile";
import rightSideBarReducer from "../reducers/rightSideBar";
import friendsListReducer from "../reducers/friendsList";
import findFriendsReducer from "../reducers/findFriends";
import authReducer from "../reducers/auth";

let reducersCombined = combineReducers({
    dialogs: dialogsReducer,
    profile: profileReducer,
    rightSideBar: rightSideBarReducer,
    friendsList: friendsListReducer,
    findFriends: findFriendsReducer,
    auth: authReducer
});
let store = createStore(reducersCombined);

export default store;