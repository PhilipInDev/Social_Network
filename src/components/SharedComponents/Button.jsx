import './Button.scss'

const Button = (props) => {
    return(
        <button
            className={props.disabled ? 'commonButton commonButton--disabled' :  'commonButton'}
            type={props.type ? props.type : 'button'}
        >{props.inner}</button>
    )
}

export default Button;