import {applyMiddleware, combineReducers, createStore} from 'redux';
import dialogsReducer from "../reducers/dialogs";
import profileReducer from "../reducers/profile";
import rightSideBarReducer from "../reducers/rightSideBar";
import friendsListReducer from "../reducers/friendsList";
import findFriendsReducer from "../reducers/findFriends";
import authReducer from "../reducers/auth";
import appReducer from "../reducers/app";
import thunkMiddleware from "redux-thunk";
import {ThunkAction} from "redux-thunk";
import { AnyAction } from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

let reducersCombined = combineReducers({
    dialogs: dialogsReducer,
    profile: profileReducer,
    rightSideBar: rightSideBarReducer,
    friendsList: friendsListReducer,
    findFriends: findFriendsReducer,
    auth: authReducer,
    app: appReducer
});
const store = createStore(reducersCombined, composeWithDevTools(applyMiddleware(thunkMiddleware)
));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
    >
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// let store = createStore(reducersCombined, applyMiddleware(thunkMiddleware));

export default store;