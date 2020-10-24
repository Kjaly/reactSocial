import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectsHelpers";
import {PhotosType, UserType} from "../Types/types";
import {Dispatch} from "redux";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {ThunkAction} from "redux-thunk";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>, // array of users id
}
type InitialStateType = typeof initialState


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "TOGGLE_FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id',)
            }
        case 'SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USER_COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    toggleFollow: (userId: number) => ({type: 'TOGGLE_FOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUserCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USER_COUNT',
        count: totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
}


type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {

    return async (dispatch, getState) => {
        dispatch(actions.toggleIsFetching(true));

        let response = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setTotalUserCount(response.totalCount));
    }
}


const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any) => {
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