import './UserLoginItem.scss'
import defAvatar from '../../../assets/images/defaultAvatar.png'
import {NavLink} from "react-router-dom";

const UserLoginItem = (props) => {
    if(!props.isAuth){
        return(
            <div className="user-not-auth">
                <NavLink to='#' className="user-not-auth__sign-in">Sign In</NavLink>
                <NavLink to='#' className="user-not-auth__sign-up">Sign Up</NavLink>
            </div>
        )
    }
    return(
        <div className="user-login-item">
            <img src={props.avatar ? props.avatar : defAvatar} alt="Authorized User Img" className="user-login-item__avatar"/>
            <div className="user-login-item__info">
                <p className="user-login-item__login">
                    {props.login}
                </p>
            </div>
        </div>
    )

}

export default UserLoginItem;