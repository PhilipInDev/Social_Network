import './Login.scss';
import Button from "../SharedComponents/Button";
import {NavLink, Redirect} from "react-router-dom";
import React, {useState} from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputText from "../SharedComponents/InputText/InputText";


const loginFormValidationSchema = Yup.object({
    loginEmailInput: Yup.string().email('Invalid email address').required('Required'),
    loginPwdInput: Yup.string().required('Required')
});
const togglePwdVisibilityOnClick = (ref, toggler) => {
    if (ref.current.type === 'password') {
        ref.current.type = 'text';
        toggler('text')
    } else {
        ref.current.type = 'password';
        toggler('password')
    }
}
const choosePwdVisibilityIcon = (inputType) => {
    if(inputType === 'password'){
        return <i className="fas fa-eye-slash login-form__pwd-toggle-visibility-icon" />
    }
    if(inputType === 'text'){
        return  <i className="fas fa-eye login-form__pwd-toggle-visibility-icon" />
    }
}
const submitBtn = (isDisabled) => <Button inner="Submit" type="submit" disabled={isDisabled} isFetching={isDisabled} fetchingMessage={'Submitting...'}/>;


const Login = (props) => {
    const reactToIncorrectAuthData = props.isAuthDataIncorrect ? 'login__box--shaking login__box--red' : '';
    if(props.isAuthDataIncorrect){
        setTimeout(() => {props.toggleIsAuthDataIncorrect(false)}, 1600)
    }
    if(props.isAuth){
        return <Redirect to={'/profile'}/>;
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
    const pwdInputRef = React.createRef();
    return (
        <Formik
            initialValues={{
                loginEmailInput: '',
                loginPwdInput: '',
                rememberMe: false,
                captcha: ''
            }}
            validationSchema={loginFormValidationSchema}
            onSubmit={values => {
                toggleIsSubmitting(true);
                props.authorize(values.loginEmailInput, values.loginPwdInput, values.rememberMe, values.captcha)
                    .then(() => {
                        toggleIsSubmitting(false);
                    })
                    .catch((message) => {
                        toggleIsSubmitting(false);
                        props.setGlobalMessage({message: message[0],isSuccess: false})
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
                        <label onClick={() => togglePwdVisibilityOnClick(pwdInputRef, setPwdInputType)} htmlFor="login-toggle-visibility" className="login-form__pwd-toggle-visibility-label">
                            {choosePwdVisibilityIcon(pwdInputType)}
                        </label>
                        <input type="checkbox"  id="login-toggle-visibility" className="login-form__pwd-toggle-visibility"/>
                    </div>
                    <span className="login-form__validation-error">{formik.errors.loginPwdInput}</span>
                    {
                        props.captchaURL &&
                            <>
                                <img src={props.captchaURL} alt={'Captcha text'} className="login-form__captcha-img"/>
                                <InputText id={'captcha'}
                                           onChange={formik.handleChange}
                                           width={'100%'}
                                />
                            </>
                    }
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