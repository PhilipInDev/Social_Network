import './Login.scss';
import Button from "../SharedComponents/Button";
import {NavLink, Redirect} from "react-router-dom";
import React, {useState} from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = (props) => {
    const reactToIncorrectAuthData = props.isAuthDataIncorrect ? 'login__box--shaking login__box--red' : '';
    if(props.isAuthDataIncorrect){
        setTimeout(() => {props.toggleIsAuthDataIncorrect(false)}, 1600)
    }
    return(
        <div className="login">
            <div className={`login__box ${ reactToIncorrectAuthData }`} >
                <h1 className="login__title">Sign In</h1>
                <LoginForm {...props}/>
            </div>
        </div>
    )
}

const LoginForm = (props) => {
    let [pwdInputType, setPwdInputType] = useState('password');
    let [isSubmitting, toggleIsSubmitting] = useState(false);
    const loginFormValidationSchema = Yup.object({
        loginEmailInput: Yup.string().email('Invalid email address').required('Required'),
        loginPwdInput: Yup.string().required('Required')
    });

    //place of troubling
    //why login pathname goes when authorization in action
    if(props.isAuth){
        return <Redirect to={'/profile'}/>;
    }

    const pwdInputRef = React.createRef();
    const togglePwdVisibilityOnClick = () => {
        if (pwdInputRef.current.type === 'password') {
            pwdInputRef.current.type = 'text';
            setPwdInputType('text')
        } else {
            pwdInputRef.current.type = 'password';
            setPwdInputType('password')
        }
    }
    const choosePwdVisibilityIcon = () => {
        if(pwdInputType === 'password'){
            return <i className="fas fa-eye-slash login-form__pwd-toggle-visibility-icon" />
        }
        if(pwdInputType === 'text'){
            return  <i className="fas fa-eye login-form__pwd-toggle-visibility-icon" />
        }
    }
    const submitBtn = (isDisabled) => <Button inner="Submit" type="submit" disabled={isDisabled}/>;

    return (
        <Formik
            initialValues={{
                loginEmailInput: '',
                loginPwdInput: '',
                rememberMe: false
            }}
            validationSchema={loginFormValidationSchema}
            onSubmit={values => {
                toggleIsSubmitting(true);
                props.authorize(values.loginEmailInput, values.loginPwdInput, values.rememberMe)
                    .then(() => {
                        toggleIsSubmitting(false);
                    })
            }}
        >
            {formik => (
                <form  onSubmit={formik.handleSubmit} action="#" method="post" className="login__form login-form">
                    <label htmlFor="loginEmailInput" className="login-form__email-label">Email:</label>
                    <div className="login-form__email-box">
                        <i className="fas fa-user" />
                        <input onChange={formik.handleChange} type="email" id="loginEmailInput" className="login-form__email"/>
                    </div>
                    <span className="login-form__validation-error">{formik.errors.loginEmailInput}</span>
                    <div className="login-form__pwd-label-box">
                        <label htmlFor="loginPwdInput" className="login-form__pwd-label">Password:</label>
                        <NavLink to='/password_reset' className="login-form__forget-pwd">Forgot password?</NavLink>
                    </div>
                    <div className="login-form__pwd-box">
                        <i className="fas fa-lock login-form__pwd-box-icon" />
                        <input onChange={formik.handleChange} type="password" id="loginPwdInput" ref={pwdInputRef} className="login-form__pwd"/>
                        <label onClick={togglePwdVisibilityOnClick} htmlFor="login-toggle-visibility" className="login-form__pwd-toggle-visibility-label">
                            {choosePwdVisibilityIcon()}
                        </label>
                        <input type="checkbox"  id="login-toggle-visibility" className="login-form__pwd-toggle-visibility"/>
                    </div>
                    <span className="login-form__validation-error">{formik.errors.loginPwdInput}</span>
                    <div className="login-form__controllers">
                        <input onChange={formik.handleChange} type="checkbox" id="rememberMe" className="login-form__remember-me"/>
                        <label htmlFor="rememberMe" className="login-form__remember-me-label">Remember Me</label>
                        <div className="login-form__submit">
                            {submitBtn(isSubmitting)}
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default Login;