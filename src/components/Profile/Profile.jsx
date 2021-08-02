import './Profile.scss'
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileIntro from "./ProfileIntro/ProfileIntro";
import ProfilePosts from "./ProfilePosts/ProfilePosts";

const Profile = () => {
    return(
        <main className='profile main'>
            <div className='profile__box'>
                <ProfileHeader
                    background='https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300'
                    avatar='https://s3.cdn.teleprogramma.pro/wp-content/uploads/2020/01/a76ebd11ecf1ab90a360b056f49b90a0.jpg'
                    name='Bill'
                    country='pandora'
                />
                <section className='profile__columns'>
                    <div className='profile__col1'>
                        <ProfileIntro />
                    </div>
                    <div className='profile__col2'>
                        <ProfilePosts />
                    </div>
                    <div className='profile__col3'>

                    </div>
                </section>
            </div>
        </main>
    )
}
export default Profile;