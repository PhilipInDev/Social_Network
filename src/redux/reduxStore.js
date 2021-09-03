import {applyMiddleware, combineReducers, createStore} from 'redux';
import dialogsReducer from "../reducers/dialogs";
import profileReducer from "../reducers/profile";
import rightSideBarReducer from "../reducers/rightSideBar";
import friendsListReducer from "../reducers/friendsList";
import findFriendsReducer from "../reducers/findFriends";
import authReducer from "../reducers/auth";
import appReducer from "../reducers/app";
import thunkMiddleware from "redux-thunk";


let reducersCombined = combineReducers({
    dialogs: dialogsReducer,
    profile: profileReducer,
    rightSideBar: rightSideBarReducer,
    friendsList: friendsListReducer,
    findFriends: findFriendsReducer,
    auth: authReducer,
    app: appReducer
});
let store = createStore(reducersCombined, applyMiddleware(thunkMiddleware));

export default store;