import {connect} from "react-redux";
import Settings from "../components/Settings/Settings";
import {putNewUserPhotoAndRefreshProfileState, refreshAuthUserProfileData, setAuthUserProfile} from "../reducers/auth";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {setGlobalMessage} from "../reducers/app";
import {withGlobalMessage} from "../hoc/withGlobalMessage";

const SettingsContainer = (props) => {
    return(
        <Settings {...props} />
    )
}
const mapStateToProps = (state) => ({
    photo: state.auth.authorizedUserProfile?.photos.small,
    profile: state.auth.authorizedUserProfile,
    authUserId: state.auth.id,
})

export default compose(
    connect(mapStateToProps, {
        setAuthUserProfile,
        setGlobalMessage,
        putNewUserPhotoAndRefreshProfileState,
        refreshAuthUserProfileData
    }),
    withAuthRedirect,
    withGlobalMessage
)(SettingsContainer);