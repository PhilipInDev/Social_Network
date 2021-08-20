import {connect} from "react-redux";
import Settings from "../components/Settings/Settings";
import {setAuthUserProfile} from "../reducers/auth";


const mapStateToProps = (state) => ({
    photo: state.auth.authorizedUserProfile.photos.small,
    authUserId: state.auth.id
})

export default connect(mapStateToProps, { setAuthUserProfile })(Settings)