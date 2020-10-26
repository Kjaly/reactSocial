import React, {ChangeEvent, FC, useState} from "react";
import s from './ProfileInfo.module.scss'
import Preloader from "../../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/IconBros.png";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../Types/types";

type PropsType = {
    profile: ProfileType | null,
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean,
    saveProfile: (profile: ProfileType) => Promise<any>
    savePhoto: (file: File) => void
}

const ProfileInfo: FC<PropsType> = ({profile, status, updateStatus, isOwner, saveProfile, savePhoto, ...props}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData: ProfileType) => {
        // remove then
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

type ProfileDataPropsType = {
    profile: ProfileType,
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean
    toEditMode: () => void,
}
const ProfileData: FC<ProfileDataPropsType> = ({profile, status, updateStatus, isOwner, toEditMode}) => {
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
            <div className={s.contacts}> Contacts: {Object
                .keys(profile.contacts)
                .map((key) => {
                    return <Contact contactTitle={key} value={profile.contacts[key as keyof ContactsType]}/>
                })} </div>
        </div>)
}

type ContactsPropsType = {
    contactTitle: string,
    value: string
}
const Contact: FC<ContactsPropsType> = ({contactTitle, value}) => {
    return <div className={s.contactsBody}><b>{contactTitle} :</b> {value}</div>

}

export default ProfileInfo;