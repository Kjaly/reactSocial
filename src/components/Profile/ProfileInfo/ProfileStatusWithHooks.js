import React, {useEffect, useState} from "react";
import s from './ProfileInfo.module.scss'

const ProfileStatusWithHooks = (props) => {
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
    const onStatusChange = (e) => {
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