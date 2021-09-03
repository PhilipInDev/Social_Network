import React from 'react';
import Header from "../components/Header/Header";
import {
    getAuthUserDataAndGetSetAuthUserProfileData, unAuthorize
} from "../reducers/auth";
import {connect} from "react-redux";

class HeaderContainer extends React.Component{
    // componentDidMount() {
    //     this.props.getAuthUserDataAndGetSetAuthUserProfileData()
    // }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth,
        userId: state.auth.id,
        login: state.auth.login,
        profile: state.auth.authorizedUserProfile,
    }
}



export default connect(mapStateToProps, {
    getAuthUserDataAndGetSetAuthUserProfileData,
    unAuthorize
})(HeaderContainer)