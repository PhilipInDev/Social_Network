import './ProfileIntro.scss'
import IntroItem from "./IntroItem/IntroItem";

const ProfileIntro = (props) => {
    const lookingForAJob = props.lookingForAJob ? <IntroItem title='Job preferences' text={props.lookingForAJobDesc}/> : null;
    const aboutMe = props.aboutMe ? <IntroItem title='About Me' text={props.aboutMe}/> : null;
    return(
        <div className='profileIntro'>
            <div className='profileIntro__title-box'>
                <h2 className='profileIntro__title'>Profile Intro</h2>
            </div>
            <div className='profileIntro__box intro-box'>
                <IntroItem title='Date of Birth' text='27.10.2000'/>
                {aboutMe}
                {lookingForAJob}
            </div>
        </div>
    )
}

export default ProfileIntro;