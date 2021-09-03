import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
    isAuthorizing: state.auth.isAuthorizing
})

export const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if(!props.isAuth && !props.isAuthorizing) return <Redirect to='/login' />
        return <Component {...props}/>
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}