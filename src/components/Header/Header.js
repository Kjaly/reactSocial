import React from 'react';
import s from './Header.module.scss'
import {NavLink} from "react-router-dom";

const Header = (props) => {
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