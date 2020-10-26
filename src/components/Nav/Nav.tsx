import React, {FC} from "react";
import s from './Nav.module.scss'
import {NavLink} from "react-router-dom";
import '../fonts/fonts.css'

const Nav:FC = () => {
    return <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to ="/profile" activeClassName = {s.active}>Profile</NavLink>
        </div>
        <div className={`${s.item}`}>
            <NavLink to ="/dialogs" activeClassName = {s.active}>Messages</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to ="/users" activeClassName = {s.active}>Users</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to ="/music" activeClassName = {s.active}>Music</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to ="/settings" activeClassName = {s.active}>Settings</NavLink>
        </div>
    </nav>
}
export default Nav;
