import './ProfileHeader.scss';
import NetworkContact from "../../SharedComponents/NetworkContact/NetworkContact";
import defBgImg from '../../../assets/images/currDefProfileBg.png'
import defAvaImg from '../../../assets/images/defaultAvatar.png';

const ProfileHeader = (props) => {
    let contactItems = [];
    for(let c in props.contacts){
        contactItems.push(<NetworkContact link={props.contacts[c]} type={c} />)
    }
    let backgroundImg = props.background ? props.background : defBgImg;
    let avatarImg = props.avatar ? props.avatar : defAvaImg;

    return(
        <div className='profileHeader'>
           <div className='profileHeader__background'>
               <img alt='Background' src={backgroundImg} />
               {/*<div className="profileHeader__add-photo">*/}
               {/*    <i className="far fa-edit"></i>*/}
               {/*</div>*/}
           </div>
            <div className='profileHeader__menu'>
                <div className="profileHeader__contacts">
                    {contactItems}
                </div>
            </div>
            <div className='profileHeader__profile-short profile-short'>
                <a href='#'>
                    <img src={avatarImg} alt='avatar'/>
                </a>
                <a href='#'><p className='profile-short__name'>{props.name}</p></a>
                <p className='profile-short__country'>{props.country}</p>
            </div>
        </div>
    )
}

export default ProfileHeader;