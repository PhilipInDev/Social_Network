import './ProfileSettings.scss'
import React, {useState} from "react";
import Button from "../../SharedComponents/Button";
import defAvatar from '../../../assets/images/defaultAvatar.png';
import { Formik } from 'formik';
import InputText from "../../SharedComponents/InputText/InputText";
import InputCheckbox from "../../SharedComponents/InputCheckbox/InputCheckbox";
import Textarea from "../../SharedComponents/Textarea/Textarea";
import * as Yup from "yup";
import lodash from "lodash";

const ProfileSettings = ({profile, authUserId, photo, putNewUserPhotoAndRefreshProfileState,refreshAuthUserProfileData}) => {
    let [file, setFile] = useState(null);
    let [fileURL, setFileURL] = useState('')

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
        setFileURL(URL.createObjectURL(event.target.files[0]));
    }

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "image",
            file,
            file.name
        );
        putNewUserPhotoAndRefreshProfileState(formData, authUserId)
    }
    let imgForPreview = photo ? photo : defAvatar;
    return(
        <div className="profile-settings">
            <div>
                <img src={fileURL ? fileURL : imgForPreview} alt="" className="profile-settings__img-preview" />
                <div className="profile-settings__set-img-controllers">
                    <label htmlFor='profile-settings__img-input' className="profile-settings__img-input-label">Browse...</label>
                    <input className="profile-settings__img-input" id='profile-settings__img-input' type="file" onChange={onFileChange} />
                    <div className="profile-settings__set-img-button" onClick={onFileUpload}>
                        <Button inner='Set Image' disabled={!file}/>
                    </div>
                </div>
            </div>
            <ProfileSettingsForm profile={profile} refreshAuthUserProfileData={refreshAuthUserProfileData}/>
        </div>
    )
}

const ProfileSettingsForm = ({profile, refreshAuthUserProfileData}) => {
    let [isLookingForAJob, setIsLookingForAJob] = useState(profile.lookingForAJob);
    let [isFetching, setIsFetching] = useState(false);
    let contactsValidationMapped = {};
    let contactsKeys = Object.keys(profile.contacts);
    for(let c = 0; c < contactsKeys.length; c++){
        contactsValidationMapped[contactsKeys[c]] = Yup.string().nullable().url('Must be in URL format');
    }
    const profileSettingsFormValidationSchema = Yup.object({
        fullName: Yup.string().min(2, 'Name must have more than 2 characters').max(50, '50 characters limit').required('Required').trim(),
        lookingForAJobDescription: Yup.string().nullable().max(200, '200 characters limit').trim(),
        aboutMe: Yup.string().nullable().max(200, '200 characters limit').trim(),
        ...contactsValidationMapped
    });
    const initialValues = {
        fullName: profile.fullName,
        aboutMeInput: profile.aboutMe,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        github: profile.contacts.github,
        vk: profile.contacts.vk,
        facebook: profile.contacts.facebook,
        instagram: profile.contacts.instagram,
        twitter: profile.contacts.twitter,
        website: profile.contacts.website,
        youtube: profile.contacts.youtube,
        mainLink: profile.contacts.mainLink
    }
    return(
        <Formik
            initialValues={initialValues}
            validationSchema={profileSettingsFormValidationSchema}
            onSubmit={(values)=>{
                if(!lodash.isEqual(initialValues, values)){
                    const profileDataFromSettings = {
                        aboutMe: values.aboutMeInput,
                        fullName: values.fullName,
                        lookingForAJob: values.lookingForAJob,
                        lookingForAJobDescription: values.lookingForAJobDescription,
                        contacts: {
                            github: values.github,
                            vk: values.vk,
                            facebook: values.facebook,
                            instagram: values.instagram,
                            twitter: values.twitter,
                            website: values.website,
                            youtube: values.youtube,
                            mainLink: values.mainLink
                        }
                    };
                    setIsFetching(true);
                    refreshAuthUserProfileData(profileDataFromSettings)
                        .then(() => setIsFetching(false))
                }
            }}
        >
            {
                formik => (
                    <form className={'profile-settings__form'} onSubmit={formik.handleSubmit}>
                        <InputText
                               id={'fullName'}
                               label={'Full Name'}
                               value={profile.fullName}
                               width={'100%'}
                               onChange={formik.handleChange}
                               error={formik.errors.fullName}
                        />
                        <Textarea
                            id={'aboutMeInput'}
                            label={'About Me'}
                            minHeight={'80px'}
                            maxHeight={'100px'}
                            width={'100%'}
                            value={profile.aboutMe}
                            onChange={formik.handleChange}
                            error={formik.errors.aboutMeInput}
                        />
                        <InputCheckbox
                               id={'lookingForAJob'}
                               isChecked={profile.lookingForAJob}
                               onChange={(e) => {
                                   formik.handleChange(e);
                                   setIsLookingForAJob(!isLookingForAJob);
                               }}
                               label={'Are you looking for a job?'}
                        />
                        <Textarea
                            id={'lookingForAJobDescription'}
                            label={'Description of the desired job'}
                            disabled={!isLookingForAJob}
                            minHeight={'80px'}
                            maxHeight={'100px'}
                            width={'100%'}
                            value={profile.lookingForAJobDescription}
                            onChange={formik.handleChange}
                            error={formik.errors.lookingForAJobDescription}
                        />
                        {
                            Object.keys(profile.contacts).map((key) => {
                                let contact = profile.contacts[key] ? profile.contacts[key] : '';
                                return(<InputText
                                    id={key}
                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    value={contact}
                                    maxLength={150}
                                    minLength={5}
                                    width={'100%'}
                                    onChange={formik.handleChange}
                                    error={formik.errors[key]}
                                />)
                            })
                        }
                        <Button inner="Submit" type="submit" isFetching={isFetching}/>
                    </form>
                )
            }
        </Formik>
    )
}

export default ProfileSettings;