import React from 'react';
import Profile from "../components/Profile/Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../reducers/profile";
import {withRouter} from "react-router-dom";
import {getAuthUserData, getUserProfileData} from "../api/api";

class ProfileContainer extends React.Component{
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId){
            getAuthUserData()
                .then((data) =>{
                    if(!data.resultCode){
                        if(!userId) userId = data.data.id ? data.data.id : 2;
                        getUserProfileData(userId)
                            .then((profileData) => {
                                this.props.setUserProfile(profileData)
                            });
                    }
                })
        }
        if(userId){
            getUserProfileData(userId)
                .then((profileData) => {
                    this.props.setUserProfile(profileData)
                });
        }
    }

    render(){
        return(
            <Profile {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    authUserId: state.auth.authorizedUserProfile.userId
})

let containerWithRouter = withRouter(ProfileContainer);

export default connect(mapStateToProps,{ setUserProfile })(containerWithRouter);