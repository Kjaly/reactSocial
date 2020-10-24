import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../Types/types";

type PropsType ={
    currentPage:number
    pageSize: number
    onPageChanged:(pageNumber:number)=>void
    totalUsersCount: number
    users:Array<UserType>
    followingInProgress:Array<number>
    unfollow:(userId:number)=>void
    follow:(userId:number)=>void
}

let Users :FC<PropsType>= ({currentPage,pageSize,onPageChanged,totalUsersCount,users,...props}) => {

    return <div>
        <Paginator currentPage={currentPage} pageSize={pageSize} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} />
        {
            users.map(u => <User user = {u}
                      followingInProgress={props.followingInProgress}
                      unfollow = {props.unfollow}
                      follow ={props.follow}
                      key={u.id}/>
            )
        }
    </div>
}

export default Users;