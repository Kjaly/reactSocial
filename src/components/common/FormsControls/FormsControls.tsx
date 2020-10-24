import React, {FC} from "react";
import s from "../../Profile/MyPosts/MyPosts.module.scss";
import st from './FormsControls.module.scss'

type FormControlParamsType = {
    input:string
    meta:{
        touched:boolean,
        error:string
    }
}
type FormControlType = (element:any) => (params:FormControlParamsType) => React.ReactNode

export const Element:FormControlType= Element => ({ input, meta: {touched,error}, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={s.post + ' ' + st.formControl + " " + (hasError ? st.error : "") }>
            <Element {...input} {...props} />
            { hasError && <span> { error } </span> }
        </div>
    );
};

