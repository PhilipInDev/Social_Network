import './Nav.scss'
import {NavLink} from "react-router-dom";

const Nav = () => {
    return(
        <nav className='nav'>
            <ul className='nav__list'>
                <li><div className='nav__burger'><i className="fas fa-bars"></i></div></li>
                <li><NavLink className='nav__item' to='/profile'><i className="far fa-user-circle"></i></NavLink></li>
                <li><NavLink className='nav__item' to='/dialogs'><i className="far fa-envelope"></i></NavLink></li>
                <li><NavLink className='nav__item' to='/news'><i className="far fa-newspaper"></i></NavLink></li>
                <li><NavLink className='nav__item' to='/music'><i className="fas fa-headphones-alt"></i></NavLink></li>
                <li><NavLink className='nav__item' to='/settings'><i className="fas fa-wrench"></i></NavLink></li>
            </ul>
        </nav>
    )
}
export default Nav;