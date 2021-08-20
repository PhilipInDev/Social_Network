import './ProfileSettings.scss'
import {useState} from "react";
import Button from "../../SharedComponents/Button";
import defAvatar from '../../../assets/images/defaultAvatar.png';
import {getUserProfileData, putUsersPhoto} from "../../../api/api";

const ProfileSettings = (props) => {
    let [file, setFile] = useState(null);
    let [fileURL, setFileURL] = useState('')

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        setFileURL(URL.createObjectURL(event.target.files[0]));
    }

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "userPhoto",
            file,
            file.name
        );
        console.log(formData)
        putUsersPhoto(formData)
            .then((response)=>{
                if(!response.resultCode){
                    getUserProfileData(props.authUserId)
                        .then((profileData) => {
                            props.setAuthUserProfile(profileData)
                        })
                }
            })
    }
    let imgForPreview = props.photo ? props.photo : defAvatar;
    return(
        <div className="profile-settings">
            <img src={fileURL ? fileURL : imgForPreview} alt="" className="profile-settings__img-preview" />
            <div className="profile-settings__set-img-controllers">
                <label htmlFor='profile-settings__img-input' className="profile-settings__img-input-label">Browse...</label>
                <input className="profile-settings__img-input" id='profile-settings__img-input' type="file" onChange={onFileChange} />
                <div className="profile-settings__set-img-button" onClick={onFileUpload}>
                    <Button inner='Set Image' disabled={!file}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileSettings;