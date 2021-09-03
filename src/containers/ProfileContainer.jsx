import React from 'react';
import Profile from "../components/Profile/Profile";
import {connect} from "react-redux";
import {getUserProfileData, setUserProfile} from "../reducers/profile";
import {withRouter} from "react-router-dom";
import {AuthAPI} from "../api/api";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId){
            if(!this.props.authUserProfile?.userId && !this.props.isAuthorizing && !this.props.isAuth){
                AuthAPI.getAuthUserData()
                    .then((data) =>{
                        if(!data.resultCode){
                            if(!userId) userId = data.data.id ? data.data.id : 2;
                            this.props.getUserProfileData(userId)
                        }
                    })
            }
            if(this.props.authUserProfile){
                this.props.setUserProfile(this.props.authUserProfile)
            }
        }
        if(userId){
            this.props.getUserProfileData(userId);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.profile !== this.props.authUserProfile && !this.props.match.params.userId){
            if(this.props.authUserProfile){
                this.props.setUserProfile(this.props.authUserProfile)
            }
            if(!this.props.authUserProfile && !this.props.isAuthorizing && !this.props.isAuth){
                if(!this.props.profile){
                    AuthAPI.getAuthUserData()
                        .then((data) =>{
                            if(!data.resultCode){
                                this.props.getUserProfileData(data.data.id)
                            }
                        })
                }
            }
        }
    }

    render(){
        return(
            <Profile {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile.userProfile,
    authUserProfile: state.auth.authorizedUserProfile,
    authUserId: state.auth.authorizedUserProfile?.userId,
    isAuth: state.auth.isAuth
})


export default compose(
    connect(mapStateToProps,{ getUserProfileData, setUserProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);