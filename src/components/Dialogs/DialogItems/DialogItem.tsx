import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import s from '../Dialogs.module.scss'

type PropsType={
    id:number
    name:string
}

const DialogItem:FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;