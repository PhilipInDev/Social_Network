import './Button.scss'
import {FC} from "react";

type ButtonProps = {
    type?: 'submit' | 'reset' | 'button'
    inner: string
    disabled?: boolean
    isFetching?: boolean
    fetchingMessage?: string
}

const Button: FC<ButtonProps> = ({type, inner, disabled, isFetching, fetchingMessage}) => {
    return(
        <button
            className={disabled ? 'commonButton commonButton--disabled' :  'commonButton'}
            type={type ? type : 'button'}
        >{isFetching !== undefined
            ? isFetching
                ? fetchingMessage
                : inner
            : inner
        }</button>
    )
}

export default Button;