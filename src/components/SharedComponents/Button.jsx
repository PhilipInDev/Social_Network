import './Button.scss'

const Button = ({type, inner, disabled, isFetching}) => {
    return(
        <button
            className={disabled ? 'commonButton commonButton--disabled' :  'commonButton'}
            type={type ? type : 'button'}
        >{isFetching ? 'Sending...' : inner}</button>
    )
}

export default Button;