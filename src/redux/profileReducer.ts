import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../Types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'



let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'It\'s my third post', likesCount: 22},
        {id: 3, message: 'It\'s my second post', likesCount: 2},
        {id: 4, message: 'It\'s my first post', likesCount: 5},

    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostBody: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state
    }
    return state;
}

type AddPostCreatorActionType = {
    type: typeof ADD_POST,
    newPostBody: string
}
export const addPostCreator = (newPostBody:string):AddPostCreatorActionType => ({type: ADD_POST, newPostBody})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type setStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status:string):setStatusActionType => ({type: SET_STATUS, status})

type savePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos:PhotosType):savePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})


export const getUserProfile = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
}

export const getStatus = (userId:number) => async (dispatch:any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response));
}
export const updateStatus = (status:string) => async (dispatch:any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        debugger;
    }
}
export const savePhoto = (file:any) => async (dispatch:any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.photos));
    }
}
export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId));

    } else {
        dispatch(stopSubmit('profileInfo', {'contacts': {'facebook': response.messages[0]}}));
        return Promise.reject(response.messages[0])
    }
}


export default profileReducer