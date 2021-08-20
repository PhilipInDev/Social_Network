import './Nav.scss'
import {NavLink} from "react-router-dom";
import React, { useState } from 'react';

const Nav = () => {
    const navBarRef = React.createRef()
    const [isNavBarOpened, toggleNavBarOpening] = useState(false);

    const burgerOnClick = () => {
        toggleNavBarOpening(!isNavBarOpened)
    }

    return(
        <nav className={isNavBarOpened ? 'nav nav--opened' : 'nav'} ref={navBarRef}>
            <ul className='nav__list'>
                <li>
                    <div className='nav__burger nav__item' onClick={burgerOnClick}>
                        <i className="fas fa-bars"></i>
                        <span className="nav__item-desciption">Collapse Menu</span>
                    </div>
                </li>
                <li>
                    <NavLink className='nav__item' to='/profile'>
                        <i className="far fa-user-circle"></i>
                        <span className="nav__item-desciption">Profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className='nav__item' to='/dialogs'>
                        <i className="far fa-envelope"></i>
                        <span className="nav__item-desciption">Dialogs</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className='nav__item' to='/news'>
                        <i className="far fa-newspaper"></i>
                        <span className="nav__item-desciption">News</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className='nav__item' to='/music'>
                        <i className="fas fa-headphones-alt"></i>
                        <span className="nav__item-desciption">Music</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className='nav__item' to='/settings'>
                        <i className="fas fa-wrench"></i>
                        <span className="nav__item-desciption">Settings</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Nav;