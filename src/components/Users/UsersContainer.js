import React from 'react';
import {connect} from "react-redux";
import {
    setCurrentPage,
    toggleFolowingProgress, requestUsers, unfollow, follow,
} from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getCurentPage,
    getFolowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/usersSelectors";


class UsersContainer extends React.Component {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize);
        this.props.setCurrentPage(pageNumber);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   folowingInProgress={this.props.folowingInProgress}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurentPage(state),
        isFetching: getIsFetching(state),
        folowingInProgress: getFolowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,// Замена mapDispatch
        setCurrentPage,
        toggleFolowingProgress,
        getUsers: requestUsers,
    })
)(UsersContainer)