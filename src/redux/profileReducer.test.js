import profileReducer, {addPostCreator} from "./profileReducer";
import ReactDOM from "react-dom";
import App from "../App";
import React from "react";


it('new post should be added', () => {
    let action = addPostCreator('it-kam.com')
    let state = {
        posts: [
            {id: '1', message: 'Hi, how are you', likesCount: 12},
            {id: '2', message: 'It\'s my third post', likesCount: 22},
            {id: '2', message: 'It\'s my second post', likesCount: 2},
            {id: '2', message: 'It\'s my first post', likesCount: 5},

        ],
    };
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(5);
})
