import './Profile.scss'
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import ProfilePostsContainer from "../../containers/ProfilePostsContainer";
import Preloader from "../SharedComponents/Preloader/Preloader";
import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import {ProfilePropsType} from "../../containers/ProfileContainer";

type RouteParams = {
    userId: string
}
const Profile: FC<ProfilePropsType> = (props) => {
    const {userId} = useParams<RouteParams>();
    if(!props.profile || props.isGettingProfileData || (+userId !== props.profile?.userId && userId)){
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
                        <ProfilePostsContainer />
                    </div>
                    <div className='profile__col3'>

                    </div>
                </section>
            </div>
        </main>
    )
}
export default Profile;