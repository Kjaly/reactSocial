import React, {FC} from 'react';
import s from './Dialogs.module.scss';
import DialogItem from "./DialogItems/DialogItem";
import Message from "./Messages/Message";
import Answers from "./Answers/Answers";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Element} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogsReducer";

type MessagePropsType={
    dialogsPage: InitialStateType
    sendMessage:(messageText:string) => void
}

 type NewMessageFormType = {
    newMessageBody:string
}


const Dialogs:FC<MessagePropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message}/>);
    let answersElements = state.answers.map(a => <Answers message={a.message}/>);

    let addNewMessage = (values:NewMessageFormType) => {
        props.sendMessage(values.newMessageBody)
    }

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

const AddMessageForm:FC<InjectedFormProps<NewMessageFormType>  > = (props) => {
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

const AddMessageFormRedux = reduxForm<NewMessageFormType>({form: 'dialogAddMessageForm'})(AddMessageForm);
export default Dialogs;