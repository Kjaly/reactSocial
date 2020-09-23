import React from 'react';
import s from './Dialogs.module.scss';
import DialogItem from "./DialogItems/DialogItem";
import Message from "./Messages/Message";
import Answers from "./Answers/Answers";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Element} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";


const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message}/>);
    let answersElements = state.answers.map(a => <Answers message={a.message}/>);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) return <Redirect to={'/login'}/>;
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.dialogWrapper}>
                <div className={s.dialogHeader}>Alexey</div>
                <div className={s.messages}>
                    {messagesElements}
                    {answersElements}
                </div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>

        </div>
    );
}
const maxLength100 = maxLengthCreator(100);
const Textarea = Element('textarea')
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.chatInput}>
                <Field  validate={[required, maxLength100]} component={Textarea} name={'newMessageBody'} placeholder='Введите сообщение...'/>
                <div className={s.sendButton}>
                    <button>Send</button>
                </div>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);
export default Dialogs;