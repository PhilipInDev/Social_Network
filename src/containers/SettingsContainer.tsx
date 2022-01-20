import {connect, ConnectedProps} from "react-redux";
import Settings from "../components/Settings/Settings";
import {putNewUserPhotoAndRefreshProfileState, refreshAuthUserProfileData, setAuthUserProfile} from "../reducers/auth";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {setGlobalMessage} from "../reducers/app";
import {withGlobalMessage} from "../hoc/withGlobalMessage";
import {FC} from "react";
import {RootState} from "../redux/reduxStore";

const SettingsContainer: FC<SettingsPropsType> = (props) => {
    return(
        <Settings {...props} />
    )
}
const mapStateToProps = (state: RootState) => ({
    photo: state.auth.authorizedUserProfile?.photos.small,
    profile: state.auth.authorizedUserProfile,
    authUserId: state.auth.id,
})
const connector = connect(mapStateToProps, {
    setAuthUserProfile,
    setGlobalMessage,
    putNewUserPhotoAndRefreshProfileState,
    refreshAuthUserProfileData
});
type SettingsPropsType = ConnectedProps<typeof connector>;

export default compose(
    connector,
    withAuthRedirect,
    withGlobalMessage
)(SettingsContainer);