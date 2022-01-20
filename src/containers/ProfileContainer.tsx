import React, {FC, useEffect} from 'react';
import Profile from "../components/Profile/Profile";
import {connect, ConnectedProps} from "react-redux";
import {
    initUserProfileWithDataInMemory,
    initUserProfileWithoutDataInMemory,
    putUserStatus
} from "../reducers/profile";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {withGlobalMessage} from "../hoc/withGlobalMessage";
import {RootState} from "../redux/reduxStore";

type RouteParams = {
    userId: string
}
export const ProfileContainer: FC<ProfilePropsType> = (props) => {
    const userId = +useParams<RouteParams>().userId;
    useEffect(() => {
        window.scrollTo( 0, 0 );
        if(userId !== props.profile?.userId || !userId){
            if(JSON.stringify(props.authUserProfile) !== JSON.stringify(props.profile) || props.authUserStatus !== props.userStatus){
                if(props.authUserProfile && !props.isGettingProfileData){
                    props.initUserProfileWithDataInMemory(props.authUserProfile, props.authUserStatus);
                }
            }
            if(userId){
                props.initUserProfileWithoutDataInMemory(userId);
            }
        }
    }, [userId, props.authUserProfile, props.authUserStatus])

    return(
            <Profile {...props}/>
    )
}

const mapStateToProps = (state: RootState) => ({
    profile: state.profile.userProfile,
    userStatus: state.profile.userStatus,
    authUserProfile: state.auth.authorizedUserProfile,
    authUserStatus: state.auth.authUserStatus,
    authUserId: state.auth.authorizedUserProfile?.userId,
    isAuth: state.auth.isAuth,
    isGettingProfileData: state.profile.isGettingProfileData
})
const connector = connect(mapStateToProps,{
        initUserProfileWithDataInMemory,
        initUserProfileWithoutDataInMemory,
        putUserStatus
    });
export type ProfilePropsType = ConnectedProps<typeof connector>;

export default compose(
    connector,
    withAuthRedirect,
    withGlobalMessage
)(ProfileContainer);