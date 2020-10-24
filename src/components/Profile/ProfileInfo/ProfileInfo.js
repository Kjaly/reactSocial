import React, {useState} from "react";
import s from './ProfileInfo.module.scss'
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/IconBros.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, saveProfile, ...props}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
            setEditMode(false);
        })


    }
    return (
        <div className={s.profileWrapper}>
            <div className={s.avatar}>
                <img className={s.avatarImg} src={profile.photos.large || userPhoto}
                     alt=""/>
                <div className={s.photoUploader}>{isOwner &&
                <input type={'file'} onChange={onMainPhotoSelected}/>}</div>
            </div>
            {editMode ?
                <ProfileDataForm initialValues={profile} profile={profile} status={status} updateStatus={updateStatus}
                                 onSubmit={onSubmit}/> :
                <ProfileData profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner}
                             toEditMode={() => {
                                 setEditMode(true)
                             }}/>}
        </div>
    )
}

const ProfileData = ({profile, status, updateStatus, isOwner, toEditMode}) => {
    return (
        <div className={s.descriptionBlock}>
            {isOwner && <div>
                <button onClick={toEditMode}>Edit</button>
            </div>}
            <div className={s.name}>
                <div className={s.fullname}>{profile.fullName}</div>
            </div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            <div className={s.job}> Looking for a job: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
            {profile.lookingForAJob &&
            <div>My skills: {profile.lookingForAJobDescription} </div>}
            <div className={s.aboutMe}>About me: {profile.aboutMe}</div>
            <div className={s.contacts}> Contacts: {Object.keys(profile.contacts).map(key => {
                return <Contact contactTitle={key} value={profile.contacts[key]}/>
            })} </div>
        </div>)
}

const Contact = ({contactTitle, value}) => {
    return <div className={s.contactsBody}><b>{contactTitle} :</b> {value}</div>

}

export default ProfileInfo;