import userEvent from '@testing-library/user-event';
import {refreshAuthUserProfileData} from "../../../reducers/auth";
import ProfileSettings from "./ProfileSettings";
import {render, waitFor} from "@testing-library/react";

describe('ProfileSettings', () => {
    const mockPutUserProfile = jest.fn(refreshAuthUserProfileData);
    const userProfileData = {
        aboutMe: "aboutMeInput",
        fullName: "fullName",
        lookingForAJob: true,
        lookingForAJobDescription: "lookingForAJobDescription",
        contacts: {
            github: null,
            vk: null,
            facebook: null,
            instagram: null,
            twitter: null,
            website: null,
            youtube: null,
            mainLink: null
        }
    };

    test('Submit button doesnt fetch if no one of the fields have been changed', () => {
        const {getByText} = render(
            <ProfileSettings
                profile={userProfileData}
                refreshAuthUserProfileData={mockPutUserProfile}
        />)
        userEvent.click(getByText('Submit'));
        expect(mockPutUserProfile).toHaveBeenCalledTimes(0);
    })
    test('Submit button fetches if one of the fields have been changed', async() => {
        const {getByText, getByDisplayValue} = render(
            <ProfileSettings
                profile={userProfileData}
                refreshAuthUserProfileData={mockPutUserProfile}
            />)
        userEvent.type(getByDisplayValue('fullName'), ' of mine');
        getByDisplayValue('fullName of mine');
        userEvent.click(getByText('Submit'));
        await waitFor(() => expect(mockPutUserProfile).toHaveBeenCalledTimes(1))
    })
})