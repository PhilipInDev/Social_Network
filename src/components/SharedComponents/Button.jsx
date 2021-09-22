import './Button.scss'

const Button = ({type, inner, disabled, isFetching, fetchingMessage}) => {
    return(
        <button
            className={disabled ? 'commonButton commonButton--disabled' :  'commonButton'}
            type={type ? type : 'button'}
        >{isFetching ? fetchingMessage : inner}</button>
    )
}

export default Button;