import React from 'react';
import {NavLink} from "react-router-dom";
import s from '../Dialogs.module.scss'

const DialogItem = (props) => {
    return (
        <div className={s.item}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;