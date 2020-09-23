import React from "react";
import {addPostCreator} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostBody) => {
            dispatch(addPostCreator(newPostBody));
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;