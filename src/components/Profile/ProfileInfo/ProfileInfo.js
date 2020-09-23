import React from "react";
import s from './ProfileInfo.module.scss'
import Preloader from "../../common/preloader/Preloader";
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile,status,updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
        <div className={s.profileWrapper}>
            <div className={s.avatar}>
                <img className={s.avatarImg} src={profile.photos.small}
                     alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <div className={s.name}>
                    <div className={s.firstname}>{profile.fullName}</div>
                    <div className={s.surname}></div>
                </div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                <div className={s.birth}> Date of Birth: 9 marth</div>
                <div className={s.city}>City: Kaliningrad</div>
                <div className={s.education}> Education: RANHiGS</div>
                <div className={s.website}>Web Site: {profile.contacts.vk}</div>
            </div>
        </div>
    )
}

export default ProfileInfo;