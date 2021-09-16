import React, {useEffect} from 'react';
import Profile from "../components/Profile/Profile";
import {connect} from "react-redux";
import {
    initUserProfileWithDataInMemory,
    initUserProfileWithoutDataInMemory,
    putUserStatus
} from "../reducers/profile";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

export const ProfileContainer = (props) => {
    useEffect(() => {
        window.scrollTo( 0, 0 );
        let userId = +props.match.params.userId;
        if(userId !== props.profile?.userId || !userId){
            if(!userId && JSON.stringify(props.authUserProfile) !== JSON.stringify(props.profile)){
                if(props.authUserProfile && !props.isGettingProfileData){
                    props.initUserProfileWithDataInMemory(props.authUserProfile, props.authUserStatus);
                }
            }
            if(userId){
                props.initUserProfileWithoutDataInMemory(userId);
            }
        }
    }, [props.match.params.userId, props.authUserProfile])

    return(
            <Profile {...props}/>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profile.userProfile,
    userStatus: state.profile.userStatus,
    authUserProfile: state.auth.authorizedUserProfile,
    authUserStatus: state.auth.authUserStatus,
    authUserId: state.auth.authorizedUserProfile?.userId,
    isAuth: state.auth.isAuth,
    isGettingProfileData: state.profile.isGettingProfileData
})


export default compose(
    connect(mapStateToProps,{
        initUserProfileWithDataInMemory,
        initUserProfileWithoutDataInMemory,
        putUserStatus
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);