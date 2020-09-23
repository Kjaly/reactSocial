import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

let initialState = {
    posts: [
        {id: '1', message: 'Hi, how are you', likesCount: 12},
        {id: '2', message: 'It\'s my third post', likesCount: 22},
        {id: '2', message: 'It\'s my second post', likesCount: 2},
        {id: '2', message: 'It\'s my first post', likesCount: 5},

    ],
    newPostText: 'new Post',
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let body = action.newPostBody;
            return {
                ...state,
                posts: [...state.posts, {id: 6, message: body, likesCount: 5}]
            }
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state
    }

    return state;
}
export const addPostCreator = (newPostBody) => ({type: ADD_POST, newPostBody})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response));
}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(setStatus(status));
    }
}


export default profileReducer