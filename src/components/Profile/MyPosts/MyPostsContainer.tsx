import React from "react";
import {actions} from "../../../redux/profileReducer";
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";


const mapStateToProps = (state:AppStateType) => {
    return {
        posts: state.profilePage.posts,
        // newPostBody: state.profilePage.newPostBody,
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addPost: (newPostBody) => {
//             dispatch(actions.addPostCreator(newPostBody));
//         },
//     }
// }

const MyPostsContainer = connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStateToProps, {
    addPost:actions.addPostCreator // замена диспатча выше
})(MyPosts);

export default MyPostsContainer;