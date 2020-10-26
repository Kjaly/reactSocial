import React, {ComponentType, FC} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/reduxStore";

let mapStateToPropsForRedirect = (state:AppStateType) => ({
    isAuth: state.auth.isAuth,
} as MapPropsType)

type MapPropsType = {
    isAuth:boolean
}

export const withAuthRedirect =<WCP,> (WrappedComponent:ComponentType<WCP>) => {
    const RedirectComponent:FC<MapPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>;
        return <WrappedComponent {...restProps as unknown as WCP}/>
    }


    let ConnectedAuthRedirectComponent = connect<MapPropsType,{},WCP,AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
    return ConnectedAuthRedirectComponent;
}