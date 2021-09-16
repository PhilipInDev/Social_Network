
export const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';
export const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
    title: 'Dialogs',
    messageInputValue: '',
    messages: [
        {id: 1, message: 'Hey, how a u?', time: '10:00', owner: 'Vasya'},
        {id: 2, message: 'Hey, how a u, friend?', time: '10:01', owner: 'Vasya'},
        {id: 3, message: 'Hey, fine', time: '10:03'},
        {id: 4, message: 'And u?', time: '10:04'},
        {id: 5, message: 'The same', time: '10:07', owner: 'Vasya'},
    ],
    dialogItems: [
        {
            id: '1',
            avatarLink: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
            name: 'Vasya',
            messageName: 'Vasya',
            message: 'how a ya bro?'
        },
        {
            id: '2',
            avatarLink: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
            name: 'Tanya',
            messageName: 'Tanya',
            message: 'how a ya ma loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee?'
        },
        {
            id: '3',
            avatarLink: 'https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg',
            name: 'Dimich',
            messageName: 'Dimich',
            message: 'how a ya bro?'
        },
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type){
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {
                    id: state.messages.length + 1,
                    message: action.message,
                    time: action.time,
                    owner: null
                }],
                messageInputValue: ''
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                messageInputValue: action.text
            };
        default:
            return state;
    }
}

export const updateNewMessageTextActionCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    text: text
})
export const sendMessageActionCreator = (message, time) => ({
    type: SEND_MESSAGE,
    message: message,
    time: time
})

export default dialogsReducer;