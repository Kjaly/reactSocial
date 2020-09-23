const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [
        {id: '1', message: 'Hi'},
        {id: '2', message: 'How are u bro'},
        {id: '3', message: 'Wasssup'},
        {id: '4', message: 'Yahoo'},
        {id: '5', message: 'Bye'},
    ],
    answers: [
        {id: '1', message: 'Hi'},
        {id: '2', message: 'It OK'},

    ],
    newMessageBody: 'Test message',
    dialogs: [
        {id: '1', name: 'Alexey'},
        {id: '2', name: 'Vasya'},
        {id: '3', name: 'Maks'},
        {id: '4', name: 'Seroja'},
        {id: '5', name: 'Valera'}
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        }
    }
    return state;
}
export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})


export default dialogsReducer;