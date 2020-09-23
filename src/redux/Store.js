import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';
let store = {
    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'Hi, how are you', likesCount: 12},
                {id: '2', message: 'It\'s my third post', likesCount: 22},
                {id: '3', message: 'It\'s my second post', likesCount: 2},
                {id: '4', message: 'It\'s my first post', likesCount: 5},

            ],
            newPostText: 'new Post',
        },
        dialogsPage: {
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
        },
        sidebar:{}
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },


    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state);

    }
}





export default store;
window.store = store