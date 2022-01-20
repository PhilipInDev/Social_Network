import React from 'react';
import Header from "../components/Header/Header";
import {
    unAuthorize
} from "../reducers/auth";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/reduxStore";

class HeaderContainer extends React.Component<HeaderPropsType>{
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootState) => {
    return{
        isAuth: state.auth.isAuth,
        userId: state.auth.id,
        login: state.auth.login,
        profile: state.auth.authorizedUserProfile,
    }
}
const connector = connect(mapStateToProps, { unAuthorize });
export type HeaderPropsType = ConnectedProps<typeof connector>;

export default connector(HeaderContainer);