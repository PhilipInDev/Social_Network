import './Settings.scss'
import {NavLink, Route} from "react-router-dom";
import ProfileSettings from "./ProfileSettings/ProfileSettings";

const Settings = (props) => {
    return(
        <div className='settings'>
            <div className="settings__box">
                <div className="settings__col1">
                    <ul className='settings__nav settings-nav'>
                        <li className='settings-nav__header'>Account Settings</li>
                        <NavLink to='/settings/profile'><li className='settings-nav__item'>Profile</li></NavLink>
                    </ul>
                </div>
                <div className="settings__col2">
                    <Route path='/settings/profile' render={() => <ProfileSettings photo={props.photo}
                                                                                   authUserId={props.authUserId}
                                                                                   setAuthUserProfile={props.setAuthUserProfile}
                    />} />
                </div>
                <div className="settings__col3"></div>
            </div>
        </div>
    )
}

export default Settings;