import './Header.scss'
import SearchPanel from "./SearchPanel/SearchPanel";
import {NavLink} from "react-router-dom";
import UserLoginItem from "./UserLoginItem/UserLoginItem";

const Header = (props) => {
    const controllersForAuthUser = () => {
        if(props.isAuth){
            return(
                <>
                    <h1 className='header__title'><span>Some Page</span></h1>
                    <SearchPanel />
                    <NavLink to='/users' className='header__find-friends-btn'><span>Find Friends</span></NavLink>
                </>)
        }
    }
    return(

        <header className='header'>
            <div className='header__logo-wrapper'>
                <i className='fas fa-project-diagram header__logo'></i>
            </div>
            {controllersForAuthUser()}
            <div className='header__user-login-box'>
                <UserLoginItem
                    isAuth={props.isAuth}
                    login={props.login}
                    avatar={props.profile?.photos.small}
                    unAuthorize={props.unAuthorize}
                />
            </div>
        </header>
    )
}

export default Header;