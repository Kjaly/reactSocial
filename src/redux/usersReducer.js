import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectsHelpers";

const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    folowingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', )
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return {...u, followed: !u.followed}
                //     }
                //     return u
                // })
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USER_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                folowingInProgress: action.isFetching
                    ? [...state.folowingInProgress, action.userId] : state.folowingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }
}
export const toggleFollow = (userId) => ({type: TOGGLE_FOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUserCount = (totalUsersCount) => ({type: SET_TOTAL_USER_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFolowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

export const requestUsers = (page, pageSize) => {

    return async (dispatch) => {

        dispatch(toggleIsFetching(true));

        let response = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(response.items));
        dispatch(setTotalUserCount(response.totalCount));
    }
}


const followUnfollowFlow = async (dispatch, userId, apiMethod) => {
    dispatch(toggleFolowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode == 0) {
        dispatch(toggleFollow(userId));
    }
    dispatch(toggleFolowingProgress(false, userId))
}

export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI))
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI))
    }
}


export default usersReducer;