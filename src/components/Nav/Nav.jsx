import './Nav.scss'
import {NavLink} from "react-router-dom";
import React, { useState } from 'react';
import {useOutsideAlerter} from "../SharedComponents/sharedFunc";

const Nav = (props) => {
    const navBarRef = React.createRef();
    const [isNavBarOpened, toggleNavBarOpening] = useState(false);
    useOutsideAlerter(navBarRef, toggleNavBarOpening);
    const burgerOnClick = () => {
        toggleNavBarOpening(!isNavBarOpened)
    }
    if(!props.isAuth) return null;
    return(
        <nav className={isNavBarOpened ? 'nav nav--opened' : 'nav'} ref={navBarRef}>
            <ul className='nav__list'>
                <li>
                    <div className='nav__burger nav__item' onClick={burgerOnClick}>
                        <i className="fas fa-bars"/>
                        <span className="nav__item-description">Collapse Menu</span>
                    </div>
                </li>
                <li>
                    <NavLink className='nav__item' to='/profile'>
                        <i className="far fa-user-circle"/>
                        <span className="nav__item-description">Profile</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className='nav__item' to='/dialogs'>
                        <i className="far fa-envelope"/>
                        <span className="nav__item-description">Dialogs</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className='nav__item' to='/news'>
                        <i className="far fa-newspaper"/>
                        <span className="nav__item-description">News</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className='nav__item' to='/music'>
                        <i className="fas fa-headphones-alt"/>
                        <span className="nav__item-description">Music</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className='nav__item' to='/settings'>
                        <i className="fas fa-wrench"/>
                        <span className="nav__item-description">Settings</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
export default Nav;