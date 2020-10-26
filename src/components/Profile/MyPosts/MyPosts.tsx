import React, {FC} from "react";
import s from './MyPosts.module.scss'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, minLengthCreator, required} from "../../../utils/validators/validators";
import {Element} from "../../common/FormsControls/FormsControls";
import {PostType} from "../../../Types/types";


export type AddPostFormValuesType = {
    newPostBody:string
}
export type MapPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {

    addPost: (newPostBody: string) => void
}
const MyPosts:FC<MapPropsType & DispatchPropsType> = props => {
    console.log('render')
    let postElements = props.posts.map(p => <Post key={p.id} counts={p.likesCount} message={p.message}/>)

    let addNewPost = (values:AddPostFormValuesType) => {
        props.addPost(values.newPostBody)
    }

    return <div className={s.postsWrapper}>
        <h3 className={s.postHeader}>My posts</h3>
        <AddPostFormRedux onSubmit={addNewPost}/>
        <div className={s.posts}>
            {postElements}
        </div>
    </div>
}
const MyPostsMemo= React.memo(MyPosts)

const maxLength30 = maxLengthCreator(30);
const minLength2 = minLengthCreator(2);
const Textarea = Element('textarea')



const AddPostForm:FC<InjectedFormProps<AddPostFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.makePostWrapper}>
                <div className={s.makePost}>
                    <div className={s.postAvatar}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhlUJ9_4Au3qrw7-DlLRAC0N14CdTgfzHUsg&usqp=CAU"
                            alt=""/>
                    </div>
                    <Field validate={[required, maxLength30,minLength2]} className={s.postText} component={Textarea} name = {'newPostBody'} placeholder='Введите сообщение...' />
                </div>
                <div className={s.postButton}>
                    <button >
                        <div className={s.postButtonText}>Add post</div>
                    </button>
                </div>
            </div>
        </form>
    )
}

const AddPostFormRedux = reduxForm<AddPostFormValuesType>({form:'profileAddPostForm'})(AddPostForm);
export default MyPostsMemo;