import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import './App.scss';
import React, {useEffect} from 'react';
import store, {RootState} from "./redux/reduxStore";
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
import {useAppReducerDispatch, useAppState} from "./reducers/app";
import {withSuspense} from "./hoc/withSuspense";
import GlobalMessage from "./components/SharedComponents/GlobalMessage/GlobalMessage";

const LoginContainer = React.lazy((): Promise<{ default: any }> => import("./containers/LoginContainer"));

const App = (props: {state: RootState, getAuthUserDataAndGetSetAuthUserProfileData: Function}) => {
    const { initialized, globalMessage } = useAppState();
    const { toggleInitialized, removeGlobalMessage } = useAppReducerDispatch();
    const globalMessageArray = globalMessage.length
        ? globalMessage
        : null;
    useEffect(() => {
        props.getAuthUserDataAndGetSetAuthUserProfileData()
            .then(() => {
                toggleInitialized(true);
            })
    }, [])
    if(!initialized){
        return (
            <div className='app-wrapper'>
                <div className="main-wrapper main">
                    <Preloader />
                </div>
            </div>
        )
    }
    let dialogsComponent = () => <Dialogs state={props.state}/>;
    // @ts-ignore
    let profileContainerComponent = () => <ProfileContainer />;
    // @ts-ignore
    let findFriendsContainerComponent = () => <FindFriendsContainer />;
    // @ts-ignore
    let settingsContainerComponent = () => <SettingsContainer />;

    return (
      <BrowserRouter>
        <div className='app-wrapper'>
            <HeaderContainer />
            <Nav isAuth={props.state.auth.isAuth}/>
            <div className="main-wrapper main">
                {globalMessageArray
                    ? <GlobalMessage message={globalMessageArray[globalMessageArray.length - 1]?.message}
                                     isSuccess={globalMessageArray[globalMessageArray.length - 1]?.isSuccess}
                                     removeMessageFunc={removeGlobalMessage}/>
                    : null}
                <Switch>
                    <Route path='/profile/:userId?'
                           render={profileContainerComponent}/>

                    <Redirect exact from='/' to='/profile' />

                    <Route path='/profile'
                           render={profileContainerComponent}/>

                    <Route path='/dialogs'
                           render={dialogsComponent}/>

                    <Route path='/news'
                           component={News}/>

                    <Route path='/music'
                           component={Music}/>

                    <Route path='/settings'
                           render={settingsContainerComponent}/>

                    <Route path='/users'
                           render={findFriendsContainerComponent} />

                    <Route path='/login'
                           render={withSuspense(LoginContainer)} />

                </Switch>
            </div>
            <RightSideBar data={props.state.rightSideBar} isAuth={props.state.auth.isAuth}/>
        </div>
      </BrowserRouter>
    );
}

const mapStateToProps = (state: RootState) => ({
    state: state,
});

let AppContainer = compose(
    connect(mapStateToProps,{ getAuthUserDataAndGetSetAuthUserProfileData }),
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
