import React, {ComponentType, FC} from 'react';
import './App.scss';
import Nav from "./components/Nav/Nav";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import './components/fonts/fonts.css'
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import store, {AppStateType} from "./redux/reduxStore";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)


class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='grid-wrapper'>
                <HeaderContainer/>
                <div className="app-wrapper">
                    <Nav/>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs'
                               render={() => <SuspendedDialogs/>}/>
                        <Route path='/profile/:userId?'
                               render={() => <SuspendedProfile />}/>
                        <Route path='/users' render={() => <UsersContainer pageTitle={''}/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
})
let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

let SamutaiJSApp: FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamutaiJSApp;
