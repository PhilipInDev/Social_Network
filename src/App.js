import {BrowserRouter, Redirect, Route} from "react-router-dom";
import './App.scss';
import React, {useEffect} from 'react';
import store from "./redux/reduxStore";
import {connect, Provider} from "react-redux";
import Nav from "./components/Nav/Nav";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import RightSideBar from "./components/RightSideBar/RightSideBar";
import FindFriendsContainer from "./containers/FindFriendsContainer";
import ProfileContainer from "./containers/ProfileContainer";
import HeaderContainer from "./containers/HeaderContainer";
import SettingsContainer from "./containers/SettingsContainer";
import Preloader from "./components/SharedComponents/Preloader/Preloader";
import {compose} from "redux";
import {getAuthUserDataAndGetSetAuthUserProfileData} from "./reducers/auth";
import {toggleInitialized} from "./reducers/app";
import {withSuspense} from "./hoc/withSuspense";

const LoginContainer = React.lazy(() => import("./containers/LoginContainer"));

const App = (props) => {
    useEffect(() => {
        props.getAuthUserDataAndGetSetAuthUserProfileData()
            .then(() => {
                props.toggleInitialized(true);
            })
    }, [])
    if(!props.state.app.initialized){
        return (
            <div className='app-wrapper'>
                <div className="main-wrapper main">
                    <Preloader />
                </div>
            </div>
        )
    }
    let dialogsComponent = () => <Dialogs state={props.state}/>;
    let profileContainerComponent = () => <ProfileContainer />;
    let findFriendsContainerComponent = () => <FindFriendsContainer />;
    let settingsContainerComponent = () => <SettingsContainer />;

    return (
      <BrowserRouter>
        <div className='app-wrapper'>
            <HeaderContainer />
            <Nav isAuth={props.state.auth.isAuth}/>
            <div className="main-wrapper main">
                <Route path='/profile/:userId?' render={profileContainerComponent}/>
                <Route path='/dialogs' render={dialogsComponent}/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' render={settingsContainerComponent}/>
                <Route path='/users' render={findFriendsContainerComponent} />
                <Route path='/login' render={withSuspense(LoginContainer)} />
                <Route exact path='/'>
                    <Redirect to='/profile' />
                </Route>
            </div>
            <RightSideBar data={props.state.rightSideBar} isAuth={props.state.auth.isAuth}/>
        </div>
      </BrowserRouter>
    );
}

const mapStateToProps = (state) => ({
    state: state,
});

let AppContainer = compose(
    connect(mapStateToProps,{ getAuthUserDataAndGetSetAuthUserProfileData, toggleInitialized }),
)(App);

const SocialNetworkApp = () => {
    return(
        <React.StrictMode>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </React.StrictMode>
    )
}

export default SocialNetworkApp;
