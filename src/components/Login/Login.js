import React from 'react';
import s from '.././common/FormsControls/FormsControls.module.scss';
import {Field, reduxForm} from "redux-form";
import {Element} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, minLengthCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Redirect} from "react-router-dom";

const maxLength30 = maxLengthCreator(30);
const maxLength20 = maxLengthCreator(20);
const minLength3 = minLengthCreator(3);
const minLength5 = minLengthCreator(5);
const Input = Element('input')
const LoginForm = ({handleSubmit,error,captchaUrl}) => {
    return (

            <form onSubmit={handleSubmit}>
                <div>
                    <Field validate={[required, maxLength30,minLength3]} name={'email'} placeholder={'Email'} component={Input}/>
                </div>
                <div>
                    <Field validate={[required, maxLength20,minLength5]} name={'password'} type={'password'} placeholder={'Password'} component={Input}/>
                </div>
                <div>
                    <Field name={'rememberMe'} type={'checkbox'} component={'Input'}/>rememberMe
                </div>
                {captchaUrl && <img src={captchaUrl}></img>}
                {captchaUrl && <Field validate={[required]} name={'captcha'} placeholder={'Введите символы с картинки'} component={Input}/> }
                {error && <div className={s.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)


const Login = props => {
    const onSubmit = (formData) => {
        props.login(formData.email,formData.password,formData.rememberMe, formData.captcha)
    }

    if (props.isAuth){
        return <Redirect to={'/profile'} />
    }


    return (
        <div>
            <h1>Login</h1>
           <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit = {onSubmit}/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
})
export default connect(mapStateToProps,{login})(Login);