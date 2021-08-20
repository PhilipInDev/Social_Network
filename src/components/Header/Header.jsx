import './Header.scss'
import SearchPanel from "./SearchPanel/SearchPanel";
import {NavLink} from "react-router-dom";
import UserLoginItem from "./UserLoginItem/UserLoginItem";

const Header = (props) => {
    return(
        <header className='header'>
            <div className='header__logo-wrapper'>
                <i className='fas fa-project-diagram header__logo'></i>
            </div>
            <h1 className='header__title'>Some Page</h1>
            <SearchPanel />
            <NavLink to='/users' className='header__find-friends-btn'>Find Friends</NavLink>
            <div className='header__user-login-box'>
                <UserLoginItem
                    isAuth={props.isAuth}
                    login={props.login}
                    avatar={props.profile.photos.small}
                />
            </div>
        </header>
    )
}

export default Header;