import {connect} from "react-redux";
import {authorize, toggleIsAuthDataIncorrect} from "../reducers/auth";
import Login from "../components/Login/Login";
import {setGlobalMessage} from "../reducers/app";
import {compose} from "redux";
import {withGlobalMessage} from "../hoc/withGlobalMessage";


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isAuthDataIncorrect: state.auth.isAuthDataIncorrect,
    captchaURL: state.auth.captchaURL
})


export default compose(
    connect(mapStateToProps, { authorize, toggleIsAuthDataIncorrect, setGlobalMessage }),
    withGlobalMessage
)(Login)