const SEND_MESSAGE = 'SEND-MESSAGE';

type MessagesType = {
    id: number
    message: string
}
type DialogsType = {
    id: number
    name: string
}
let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are u bro'},
        {id: 3, message: 'Wasssup'},
        {id: 4, message: 'Yahoo'},
        {id: 5, message: 'Bye'},
    ] as Array<MessagesType>,
    answers: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'It OK'},

    ] as Array<MessagesType>,
    dialogs: [
        {id: 1, name: 'Alexey'},
        {id: 2, name: 'Vasya'},
        {id: 3, name: 'Maks'},
        {id: 4, name: 'Seroja'},
        {id: 5, name: 'Valera'}
    ] as Array<DialogsType>,
}

export type InitialStateType = typeof initialState


const dialogsReducer = (state = initialState, action: any):InitialStateType => {
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

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody:string
}
export const sendMessageCreator = (newMessageBody: string):SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody})


export default dialogsReducer;