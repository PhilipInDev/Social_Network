import './Button.scss'

const Button = (props) => {
    return(
        <button className={props.disabled ? 'commonButton commonButton--disabled' :  'commonButton'}>{props.inner}</button>
    )
}

export default Button;