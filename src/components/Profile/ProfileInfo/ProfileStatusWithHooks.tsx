import React, {ChangeEvent, FC, useEffect, useState} from "react";
import s from './ProfileInfo.module.scss'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatusWithHooks:FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const changeEditMode = () => {
        if (!editMode) {
            setEditMode(!editMode)
        } else {
            setEditMode(!editMode)
            props.updateStatus(status)
        }
    }
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <div>
            {!editMode &&
            <div className={s.status}>
                <span onDoubleClick={changeEditMode}>{props.status || 'Пустой статус'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} onBlur={changeEditMode} value={status} autoFocus={true}/>
            </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;