import './Profile.scss'
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import ProfilePostsContainer from "../../containers/ProfilePostsContainer";
import Preloader from "../SharedComponents/Preloader/Preloader";

const Profile = (props) => {
    if(!props.profile.userProfile){
        return <div className='profile'><div className='profile__preloader-box>'> <Preloader /> </div></div>
    }

    return(
        <main className='profile'>
            <div className='profile__box'>
                <ProfileHeader
                    background={props.profile.userProfile.photos.large}
                    avatar={props.profile.userProfile.photos.small}
                    name={props.profile.userProfile.fullName}
                    country='-'
                    contacts={props.profile.userProfile.contacts}
                />
                <section className='profile__columns'>
                    <div className='profile__col1'>
                        <ProfileIntro aboutMe={props.profile.userProfile.aboutMe}
                                      lookingForAJob={props.profile.userProfile.lookingForAJob}
                                      lookingForAJobDesc={props.profile.userProfile.lookingForAJobDescription}
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