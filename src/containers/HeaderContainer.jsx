import React from 'react';
import Header from "../components/Header/Header";
import axios from "axios";
import {setAuthUserProfile, setUserData, toggleAuth} from "../reducers/auth";
import {connect} from "react-redux";
import {getAuthUserData, getUserProfileData} from "../api/api";

class HeaderContainer extends React.Component{
    componentDidMount() {
        getAuthUserData()
            .then((data) => {
                if(!data.resultCode){
                    this.props.setUserData(data.data);
                   getUserProfileData(data.data.id)
                        .then((profileData) => {
                            this.props.toggleAuth(true)
                            this.props.setAuthUserProfile(profileData)
                        })
                }
            })
    }

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



export default connect(mapStateToProps, { setUserData, setAuthUserProfile, toggleAuth})(HeaderContainer)