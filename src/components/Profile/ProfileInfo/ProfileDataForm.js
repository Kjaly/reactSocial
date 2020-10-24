import s from "./ProfileInfo.module.scss";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";
import {Element} from "../../common/FormsControls/FormsControls";

const Input = Element('input')
const Textarea = Element('textarea')
const ProfileDataForm = ({profile,status, updateStatus,handleSubmit}) => {


    return <form onSubmit={handleSubmit} className={s.descriptionBlock}>
         <div><button>save</button></div>
        <div className={s.name}>
            <div className={s.fullname}>Full name
                <Field validate={[]} component={Input} name = {'fullName'} placeholder='Введите имя...' />
            </div>
        </div>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        <div className={s.job}> Looking for a job:  <Field validate={[]} component={Input} type={'checkbox'} name = {'lookingForAJob'} /></div>
        <div>My skills:
            <Field validate={[]} component={Textarea} name = {'lookingForAJobDescription'} placeholder='Введите свои навыки...' />
        </div>
        <div className={s.aboutMe}>About me: <Field validate={[]} component={Textarea} name = {'aboutMe'} placeholder='О себе...' /></div>
        <div className={s.contacts}> Contacts: {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:<Field validate={[]} component={Input} name ={`contacts.`+key} placeholder='Введите ...' /> </b>
            </div>
        })} </div>
    </form>
}
const ProfileDataReduxForm = reduxForm({form:'profileInfo'})(ProfileDataForm)
export default ProfileDataReduxForm