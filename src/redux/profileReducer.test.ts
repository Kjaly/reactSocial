import profileReducer, {actions} from "./profileReducer";
import ReactDOM from "react-dom";
import App from "../App";
import React from "react";
import {ProfileType} from "../Types/types";


it('new post should be added', () => {
    let action = actions.addPostCreator('it-kam.com')
    let state = {
        posts: [
            {id: 1, message: 'Hi, how are you', likesCount: 12},
            {id: 2, message: 'It\'s my third post', likesCount: 22},
            {id: 3, message: 'It\'s my second post', likesCount: 2},
            {id: 4, message: 'It\'s my first post', likesCount: 5},

        ],
        profile: null,
        status: '',
        newPostBody: ''
    };
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(5);
})
