import React from "react";
import s from "../../Profile/MyPosts/MyPosts.module.scss";
import st from './FormsControls.module.scss'


export const Element = Element => ({ input, meta: {touched,error}, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={s.post + ' ' + st.formControl + " " + (hasError ? st.error : "") }>
            <Element {...input} {...props} />
            { hasError && <span> { error } </span> }
        </div>
    );
};

