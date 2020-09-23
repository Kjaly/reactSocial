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

// export const Textarea = (props) => {
//     const hasError = meta.touched && meta.error
//     return(
//         <div className={s.post + ' ' + st.formControl + ' ' + (hasError ? st.error: '')} >
//             <div>
//             <textarea  className = {s.postText} {...input} {...props.input} />
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }
//
// export const Input = ({input, meta, ...props}) => {
//     const hasError = meta.touched && meta.error
//     return(
//         <div className={st.formControl + ' ' + (hasError ? st.error: '')} >
//             <div>
//                 <input  {...input} {...props.input} />
//             </div>
//             {hasError && <span>{meta.error}</span>}
//         </div>
//     )
// }