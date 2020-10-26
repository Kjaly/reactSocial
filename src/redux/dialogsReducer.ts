import {InferActionsTypes} from "./reduxStore";


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


const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE': {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            }
        }
    }
    return state;
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody} as const)
}

export default dialogsReducer;

type MessagesType = {
    id: number
    message: string
}
type DialogsType = {
    id: number
    name: string
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>