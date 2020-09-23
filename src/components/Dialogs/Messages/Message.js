import React from 'react';
import s from "../Dialogs.module.scss";

const Message = (props) => {
    return (
        <div className={s.message}>
            <div className={s.messageImg}>
                <img className={s.avatarImg} src="https://i.pinimg.com/564x/16/8a/29/168a2902c0e101744acd05e35183dd7a.jpg"
                     alt=""/>
            </div>

        <div className={s.messageText}>{props.message}</div>
        </div>

    )
}

export default Message;