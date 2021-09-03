import './UserLoginItem.scss'
import defAvatar from '../../../assets/images/defaultAvatar.png'
import {NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";


function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

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
                <li><NavLink to='/login' onClick={() => props.unAuthorize()}>Log Out</NavLink></li>
            </ul>
        </div>)
    const showLoginItemOptions = () => {
            toggleOptionMenu(!isOptionMenuOpened)
    }
    return(
        <div className="user-login-item" onClick={showLoginItemOptions} ref={optionsMenuRef}>
            <img src={props.avatar ? props.avatar : defAvatar} alt="Authorized User Img" className="user-login-item__avatar"/>
            <div className="user-login-item__info">
                <p className="user-login-item__login">
                    {props.login}
                </p>
            </div>
            {isOptionMenuOpened ? optionsMenu : null}
        </div>
    )

}

export default UserLoginItem;