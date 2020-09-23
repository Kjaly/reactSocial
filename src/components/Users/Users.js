import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = ({currentPage,pageSize,onPageChanged,totalUsersCount,...props}) => {

    return <div>
        <Paginator currentPage={currentPage} pageSize={pageSize} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} />
        {
            props.users.map(u => <User user = {u}
                      folowingInProgress={props.folowingInProgress}
                      unfollow = {props.unfollow}
                      follow ={props.follow}
                      key={u.id}/>
            )
        }
    </div>
}

export default Users;