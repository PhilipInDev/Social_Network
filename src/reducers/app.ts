import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GlobalMessageType} from "../types/types";
import {shallowEqual} from "react-redux";
import {useAppSelector, useAppDispatch} from "../redux/reduxStore";

// export const TOGGLE_INITIALIZED = 'TOGGLE_INITIALIZED';
// export const SET_GLOBAL_MESSAGE = 'SET_GLOBAL_MESSAGE';
// export const REMOVE_GLOBAL_MESSAGE = 'REMOVE_GLOBAL_MESSAGE';

type AppInitialStateType = {
    initialized: boolean
    globalMessage: Array<GlobalMessageType>
}
const initialState: AppInitialStateType = {
    initialized: false,
    globalMessage: []
}
const appReducer = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleInitialized: (state, action: PayloadAction<boolean>) => {
            state.initialized = action.payload;
        },
        setGlobalMessage: (state, action: PayloadAction<GlobalMessageType>) => {
            const { message, isSuccess } = action.payload;
            state.globalMessage.push({ message, isSuccess });
        },
        removeGlobalMessage: (state) => {
            state.globalMessage = [];
        }
    }
})
export const { toggleInitialized, setGlobalMessage, removeGlobalMessage } = appReducer.actions;
// const appReducer = (state = initialState, action: ActionTypes): AppInitialStateType => {
//     switch (action.type) {
//         case TOGGLE_INITIALIZED:
//             return{
//                 ...state,
//                 initialized: action.initialized
//             }
//         case SET_GLOBAL_MESSAGE:
//             return {
//                 ...state,
//                 globalMessage: [...state.globalMessage, {message: action.message,isSuccess: action.isSuccess}]
//             }
//         case REMOVE_GLOBAL_MESSAGE:
//             return{
//                 ...state,
//                 globalMessage: []
//             }
//         default:
//             return state;
//     }
// }

// type ActionTypes = ToggleInitializedType | SetGlobalMessageType | RemoveGlobalMessageType;

// type ToggleInitializedType = {
//     type: typeof TOGGLE_INITIALIZED
//     initialized: boolean
// }
// export const toggleInitialized = (isInitialized: boolean): ToggleInitializedType => ({
//     type: TOGGLE_INITIALIZED,
//     initialized: isInitialized
// })
//

// export const setGlobalMessage = (message: string, isSuccess: boolean): SetGlobalMessageType => ({
//     type: SET_GLOBAL_MESSAGE,
//     message,
//     isSuccess
// })
//
// type RemoveGlobalMessageType = {
//     type: typeof REMOVE_GLOBAL_MESSAGE
// }
// export const removeGlobalMessage = (): RemoveGlobalMessageType => ({
//     type: REMOVE_GLOBAL_MESSAGE
// })
export const useAppState = () => {
  return {
      initialized: useAppSelector(state => state.app.initialized),
      globalMessage: useAppSelector(state => state.app.globalMessage, shallowEqual)
  }
}
export const useAppReducerDispatch = () => {
    const dispatch = useAppDispatch();
    return {
        toggleInitialized: (isInitialized: boolean) => dispatch(toggleInitialized(isInitialized)),
        setGlobalMessage: (message: string, isSuccess: boolean) => dispatch(setGlobalMessage({message, isSuccess})),
        removeGlobalMessage: () => dispatch(removeGlobalMessage())
    }
}
export default appReducer.reducer;
