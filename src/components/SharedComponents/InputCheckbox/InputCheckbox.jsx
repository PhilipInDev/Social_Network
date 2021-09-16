import './InputCheckbox.scss';

const InputCheckbox = ({id, label, isChecked, onChange}) => {
    return(
        <div className="custom-checkbox">
            <label htmlFor={id} className="custom-checkbox__label-text">{label}</label>
            <input type="checkbox" id={id} onChange={onChange} defaultChecked={isChecked}/>
                <label htmlFor={id} className="custom-checkbox__label">
                    <div className="custom-checkbox__ball"/>
                </label>
        </div>
    )
}

export default InputCheckbox;