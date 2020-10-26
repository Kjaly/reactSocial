import {updateObjectInArray} from "../utils/objectsHelpers";
import {PhotosType, UserType} from "../Types/types";
import {Dispatch} from "redux";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./reduxStore";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/usersApi";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>, // array of users id
}


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SN/USERS/TOGGLE_FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id',)
            }
        case 'SN/USERS/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SN/USERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SN/USERS/SET_TOTAL_USER_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }
}


export const actions = {
    toggleFollow: (userId: number) => ({type: 'SN/USERS/TOGGLE_FOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUserCount: (totalUsersCount: number) => ({
        type: 'SN/USERS/SET_TOTAL_USER_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'SN/USERS/TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
}


export const requestUsers = (page: number, pageSize: number): ThunkType => {

    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));

        let response = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setTotalUserCount(response.totalCount));
    }
}


const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode == 0) {
        dispatch(actions.toggleFollow(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI))
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI))
    }
}


export default usersReducer;

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>