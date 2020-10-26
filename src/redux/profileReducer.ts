import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../Types/types";
import {profileAPI} from "../api/profileApi";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";


let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 12},
        {id: 2, message: 'It\'s my third post', likesCount: 22},
        {id: 3, message: 'It\'s my second post', likesCount: 2},
        {id: 4, message: 'It\'s my first post', likesCount: 5},

    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    // newPostBody: ''
}



const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
            let body = action.newPostBody;
            return {
                ...state,
                posts: [...state.posts, {id: 6, message: body, likesCount: 5}]
            }
        }

        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state
    }
    return state;
}


export const actions = {
    addPostCreator: (newPostBody: string) => ({type: 'SN/PROFILE/ADD-POST', newPostBody} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
}


export const getUserProfile = (userId: number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
}

export const getStatus = (userId: number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response));
}

export const updateStatus = (status: string):ThunkType => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        // debugger;
    }
}

export const savePhoto = (file: File):ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos));
    }
}
export const saveProfile = (profile: ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.resultCode === 0) {
        if (userId != null ){
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("user if can't be null")
        }

    } else {
        dispatch(stopSubmit('profileInfo', {'contacts': {'facebook': response.messages[0]}}));
        return Promise.reject(response.messages[0])
    }
}


export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>