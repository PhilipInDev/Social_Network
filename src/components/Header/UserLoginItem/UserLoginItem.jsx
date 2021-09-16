import './UserLoginItem.scss'
import defAvatar from '../../../assets/images/defaultAvatar.png'
import {NavLink} from "react-router-dom";
import {useRef, useState} from "react";
import {useOutsideAlerter} from "../../SharedComponents/sharedFunc";


const UserLoginItem = (props) => {
    let [isOptionMenuOpened, toggleOptionMenu] = useState(false);
    let optionsMenuRef = useRef(null);
    useOutsideAlerter(optionsMenuRef, toggleOptionMenu);
    if(!props.isAuth){
        return(
            <div className="user-not-auth">
                <NavLink to='/login' className="user-not-auth__sign-in">Sign In</NavLink>
                <NavLink to='#' className="user-not-auth__sign-up">Sign Up</NavLink>
            </div>
        )
    }
    const optionsMenu =(
        <div className='user-login-item__options-menu' >
            <ul>
                <li><NavLink to='#' onClick={() => props.unAuthorize()}>Log Out</NavLink></li>
            </ul>
        </div>)
    const showLoginItemOptions = () => {
            toggleOptionMenu(!isOptionMenuOpened)
    }
    return(
        <div className="user-login-item" ref={optionsMenuRef}>
            <img src={props.avatar ? props.avatar : defAvatar} alt="Authorized User Img" className="user-login-item__avatar"/>
            <div className="user-login-item__info">
                <p className="user-login-item__login">
                    {props.login}
                </p>
                <div
                    className={
                        !isOptionMenuOpened
                        ? 'user-login-item__arrow-box'
                        : 'user-login-item__arrow-box user-login-item__arrow-box--opened'
                    }
                    onClick={showLoginItemOptions}>
                    <span/>
                    <span/>
                </div>
            </div>
            {isOptionMenuOpened ? optionsMenu : null}
        </div>
    )

}

export default UserLoginItem;