import './ProfileIntro.scss'
import IntroItem from "./IntroItem/IntroItem";

const ProfileIntro = ({fullName, lookingForAJob, lookingForAJobDesc, aboutMe}) => {
    return(
        <div className='profileIntro'>
            <div className='profileIntro__title-box'>
                <h2 className='profileIntro__title'>Profile Intro</h2>
            </div>
            <div className='profileIntro__box intro-box'>
                {fullName && <IntroItem title={'Name'} text={fullName}/>}
                <IntroItem title='Date of Birth' text='27.10.2000'/>
                {aboutMe && <IntroItem title='About Me' text={aboutMe}/>}
                {lookingForAJob &&  <IntroItem title='Job preferences' text={lookingForAJobDesc}/>}
            </div>
        </div>
    )
}

export default ProfileIntro;