import {connect} from "react-redux";
import Settings from "../components/Settings/Settings";
import {putNewUserPhotoAndRefreshProfileState, setAuthUserProfile} from "../reducers/auth";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";


const mapStateToProps = (state) => ({
    photo: state.auth.authorizedUserProfile?.photos.small,
    authUserId: state.auth.id
})

export default compose(
    connect(mapStateToProps, {
        setAuthUserProfile,
        putNewUserPhotoAndRefreshProfileState
    }),
    withAuthRedirect
)(Settings);