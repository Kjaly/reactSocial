import React, {FC} from 'react';
import s from './Header.module.scss'
import {NavLink} from "react-router-dom";

export type MapPropsType={
    isAuth:boolean
    login:string | null
}

export type DispatchPropsType={
    logout:()=>void
}


const Header:FC<MapPropsType & DispatchPropsType > = (props) => {
    return (
        <header className={s.header}>
            <div className={s.header__inner}>
                <div className={'headerLogo'}>Nomaly</div>
                <div className={'loginBlock'}>
                    {props.isAuth
                        ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>}
                </div>
            </div>
        </header>

    )
}

export default Header;