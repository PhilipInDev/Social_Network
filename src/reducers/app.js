
export const TOGGLE_INITIALIZED = 'TOGGLE_INITIALIZED';

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_INITIALIZED:
            return{
                ...state,
                initialized: action.initialized
            }
        default:
            return state;
    }
}

export const toggleInitialized = (isInitialized) => ({
    type: TOGGLE_INITIALIZED,
    initialized: isInitialized
})


export default appReducer;
