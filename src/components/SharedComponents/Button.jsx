import './Button.scss'

const Button = (props) => {
    return(
        <button className="commonButton">{props.inner}</button>
    )
}

export default Button;