import './Settings.scss'
import {NavLink, Route} from "react-router-dom";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import {refreshAuthUserProfileData} from "../../reducers/auth";

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
                    <Route path='/settings/profile' render={() =>
                        <ProfileSettings
                            photo={props.photo}
                            profile={props.profile}
                            authUserId={props.authUserId}
                            putNewUserPhotoAndRefreshProfileState={props.putNewUserPhotoAndRefreshProfileState}
                            refreshAuthUserProfileData={props.refreshAuthUserProfileData}
                        />}
                    />
                </div>
                <div className="settings__col3"></div>
            </div>
        </div>
    )
}

export default Settings;