import {connect} from "react-redux";
import {authorize, toggleIsAuthDataIncorrect} from "../reducers/auth";
import Login from "../components/Login/Login";


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isAuthDataIncorrect: state.auth.isAuthDataIncorrect
})


export default connect(mapStateToProps, { authorize, toggleIsAuthDataIncorrect })(Login)