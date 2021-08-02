import './ProfileIntro.scss'
import IntroItem from "./IntroItem/IntroItem";

const ProfileIntro = () => {
    return(
        <div className='profileIntro'>
            <div className='profileIntro__title-box'>
                <h2 className='profileIntro__title'>Profile Intro</h2>
            </div>
            <div className='profileIntro__box intro-box'>
                <IntroItem title='Date of Birth' text='27.10.2000'/>
                <div className='intro-box__item' id='introBoxStudyWork'>
                    <h4>Study/Work:</h4>
                    <p>KHNMU</p>
                </div>
                <div className='intro-box__item' id='introBoxAbout'>
                    <h4>About Me:</h4>
                    <p>loreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeemm</p>
                </div>
                <div className='intro-box__item' id='introBoxAbout'>
                    <h4>About Me</h4>
                    <p></p>
                </div>
                <div className='intro-box__item' id='introBoxFavourite'>
                    <h4>About Me</h4><p></p>
                </div>
            </div>
        </div>
    )
}

export default ProfileIntro;