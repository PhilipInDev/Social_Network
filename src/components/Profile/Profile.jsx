import './Profile.scss'
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import ProfilePostsContainer from "../../containers/ProfilePostsContainer";
import Preloader from "../SharedComponents/Preloader/Preloader";
import React from 'react';

const Profile = (props) => {
    if(!props.profile || props.isGettingProfileData || (+props.match.params.userId !== props.profile?.userId && props.match.params.userId)){
        return <div className='profile'><div className='profile__preloader-box>'> <Preloader /> </div></div>;
    }
    return(
        <main className='profile'>
            <div className='profile__box'>
                <ProfileHeader
                    background={props.profile.photos.large}
                    avatar={props.profile.photos.small}
                    name={props.profile.fullName}
                    userStatus={props.userStatus}
                    contacts={props.profile.contacts}
                    statusEditable={props.profile.userId === props.authUserProfile?.userId}
                    putUserStatus={props.putUserStatus}
                />
                <section className='profile__columns'>
                    <div className='profile__col1'>
                        <ProfileIntro fullName={props.profile.fullName}
                                      aboutMe={props.profile.aboutMe}
                                      lookingForAJob={props.profile.lookingForAJob}
                                      lookingForAJobDesc={props.profile.lookingForAJobDescription}
                        />
                    </div>
                    <div className='profile__col2'>
                        <ProfilePostsContainer store={props.store} />
                    </div>
                    <div className='profile__col3'>

                    </div>
                </section>
            </div>
        </main>
    )
}
export default Profile;