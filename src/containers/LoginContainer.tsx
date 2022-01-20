import {connect, ConnectedProps} from "react-redux";
import {authorize, setCaptchaURL, toggleIsAuthDataIncorrect} from "../reducers/auth";
import Login from "../components/Login/Login";
import {setGlobalMessage} from "../reducers/app";
import {compose} from "redux";
import {withGlobalMessage} from "../hoc/withGlobalMessage";
import {FC, useEffect} from "react";
import {RootState} from "../redux/reduxStore";

const LoginContainer: FC<LoginPropsType> = (props) => {
    useEffect(() => {
        return () => {
            props.setCaptchaURL('');
        }
    }, [props.setCaptchaURL])

    return(
        <Login {...props} />
    )
}
const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    isAuthDataIncorrect: state.auth.isAuthDataIncorrect,
    captchaURL: state.auth.captchaURL
})
const connector = connect(mapStateToProps, { authorize, toggleIsAuthDataIncorrect, setCaptchaURL, setGlobalMessage });
type LoginPropsType = ConnectedProps<typeof connector>;

export default compose(
    connector,
    withGlobalMessage
)(LoginContainer)