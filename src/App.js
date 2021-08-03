import {BrowserRouter, Route} from "react-router-dom";
import './App.scss';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import RightSideBar from "./components/RightSideBar/RightSideBar";


const App = (props) => {
    let dialogsComponent = () => <Dialogs dataSet={props.data.dialogs} />;
    let profileComponent = () => <Profile dataSet={props.data.profile} />
  return (
      <BrowserRouter>
        <div className='app-wrapper'>
            <Header />
            <Nav />
            <div className="main-wrapper main">
                <Route path='/profile' render={profileComponent}/>
                <Route path='/dialogs' render={dialogsComponent}/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
            </div>
            <RightSideBar data={props.data.rightSideBar}/>
        </div>
      </BrowserRouter>
  );
}

export default App;
