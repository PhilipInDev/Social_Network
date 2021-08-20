import {BrowserRouter, Route} from "react-router-dom";
import './App.scss';
import React from 'react';
import Nav from "./components/Nav/Nav";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import RightSideBar from "./components/RightSideBar/RightSideBar";
import FindFriendsContainer from "./containers/FindFriendsContainer";
import ProfileContainer from "./containers/ProfileContainer";
import HeaderContainer from "./containers/HeaderContainer";
import SettingsContainer from "./containers/SettingsContainer";

const App = (props) => {
    let dialogsComponent = () => <Dialogs store={props.store}/>;
    let profileContainerComponent = () => <ProfileContainer store={props.store} />
    let findFriendsContainerComponent = () => <FindFriendsContainer store={props.store}/>
    return (
      <BrowserRouter>
        <div className='app-wrapper'>
            <HeaderContainer store={props.store}/>
            <Nav />
            <div className="main-wrapper main">
                <Route path='/profile/:userId?' render={profileContainerComponent}/>
                <Route path='/dialogs' render={dialogsComponent}/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' render={() => <SettingsContainer store={props.store}/>}/>
                <Route path='/users/:page?' render={findFriendsContainerComponent} />
            </div>
            <RightSideBar data={props.store.getState().rightSideBar}/>
        </div>
      </BrowserRouter>
    );
}

export default App;
