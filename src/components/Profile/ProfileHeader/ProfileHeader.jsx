import './ProfileHeader.scss';

const ProfileHeader = (props) => {
    return(
        <div className='profileHeader'>
           <div className='profileHeader__background'>
               <img alt='Background' src={props.background} />
           </div>
            <div className='profileHeader__menu'>
            </div>
            <div className='profileHeader__profile-short profile-short'>
                <a href='#'>
                    <img src={props.avatar} alt='avatar'/>
                </a>
                <a href='#'><p className='profile-short__name'>{props.name}</p></a>
                <p className='profile-short__country'>{props.country}</p>
            </div>
        </div>
    )
}

export default ProfileHeader;