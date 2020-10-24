import React from 'react';
import {connect,} from "react-redux";
import {
    requestUsers, unfollow, follow, actions,
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getCurentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/usersSelectors";
import {UserType} from "../../Types/types";
import {AppStateType} from "../../redux/reduxStore";

type MapStatePropsType = {
    currentPage:number
    pageSize:number
    isFetching:boolean
    totalUsersCount:number
    users:Array<UserType>
    followingInProgress:Array<number>

}
type MapDispatchPropsType = {
    unfollow:(userId:number)=>void
    follow:(userId:number)=>void
    getUsers:(currentPage:number,pageSize:number)=>void
    setCurrentPage:(pageNumber:number)=> void
    toggleFollowingProgress:(isFetching:boolean,userId:number)=>void

}

type OwnPropsType = {
    pageTitle:string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber:number) => {
        let {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize);
        this.props.setCurrentPage(pageNumber);
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged ={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}/>
        </>
    }
}

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

// const connector = connect(mapStateToProps, {
//     follow,
//     unfollow,// Замена mapDispatch
//     setCurrentPage,
//     toggleFollowingProgress,
//     getUsers: requestUsers,
// })
//
// type PropsFromredux = ConnectedProps<typeof connector>

export default compose(
// <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps, {
        follow,
        unfollow,// Замена mapDispatch
        setCurrentPage: actions.setCurrentPage,
        toggleFollowingProgress: actions.toggleFollowingProgress,
        getUsers: requestUsers,
    })
)(UsersContainer)