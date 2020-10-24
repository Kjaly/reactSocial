import React, {Suspense} from 'react';
import './App.scss';
import Nav from "./components/Nav/Nav";
import {withRouter, Route, BrowserRouter} from "react-router-dom";
import Music from "./components/Music/Music";
import './components/fonts/fonts.css'
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/preloader/Preloader";
import store from "./redux/reduxStore";
import {withSuspense} from "./hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component<{}> {
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
                               render={withSuspense(DialogsContainer)}/>
                        <Route path='/profile/:userId?'
                               render={withSuspense(ProfileContainer)}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})
 let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

let SamutaiJSApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamutaiJSApp;
