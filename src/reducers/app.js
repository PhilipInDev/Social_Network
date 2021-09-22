
export const TOGGLE_INITIALIZED = 'TOGGLE_INITIALIZED';
export const SET_GLOBAL_MESSAGE = 'SET_GLOBAL_MESSAGE';
export const REMOVE_GLOBAL_MESSAGE = 'REMOVE_GLOBAL_MESSAGE';

const initialState = {
    initialized: false,
    globalMessage: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_INITIALIZED:
            return{
                ...state,
                initialized: action.initialized
            }
        case SET_GLOBAL_MESSAGE:
            return {
                ...state,
                globalMessage: [...state.globalMessage, {message: action.message,isSuccess: action.isSuccess}]
            }
        case REMOVE_GLOBAL_MESSAGE:
            return{
                ...state,
                globalMessage: []
            }
        default:
            return state;
    }
}

export const toggleInitialized = (isInitialized) => ({
    type: TOGGLE_INITIALIZED,
    initialized: isInitialized
})

export const setGlobalMessage = (message, isSuccess) => ({
    type: SET_GLOBAL_MESSAGE,
    message,
    isSuccess
})

export const removeGlobalMessage = () => ({
    type: REMOVE_GLOBAL_MESSAGE
})


export default appReducer;
