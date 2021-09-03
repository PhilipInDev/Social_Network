import './Profile.scss'
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import ProfilePostsContainer from "../../containers/ProfilePostsContainer";
import Preloader from "../SharedComponents/Preloader/Preloader";

const Profile = (props) => {
    if(!props.profile){
        return <div className='profile'><div className='profile__preloader-box>'> <Preloader /> </div></div>
    }
    return(
        <main className='profile'>
            <div className='profile__box'>
                <ProfileHeader
                    background={props.profile.photos.large}
                    avatar={props.profile.photos.small}
                    name={props.profile.fullName}
                    country='-'
                    contacts={props.profile.contacts}
                />
                <section className='profile__columns'>
                    <div className='profile__col1'>
                        <ProfileIntro aboutMe={props.profile.aboutMe}
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