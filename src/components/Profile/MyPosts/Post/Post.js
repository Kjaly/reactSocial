import React from "react";
import s from './Post.module.scss'

const Post = (props) => {
    return <div className={s.item}>
        <div className={s.itemImg}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhlUJ9_4Au3qrw7-DlLRAC0N14CdTgfzHUsg&usqp=CAU"
                alt=""/>
        </div>
        <div className={s.itemText}>
            {props.message}
        </div>
        <div className={s.like}>
            <span>Like {props.counts} </span>
        </div>
    </div>


}

export default Post;