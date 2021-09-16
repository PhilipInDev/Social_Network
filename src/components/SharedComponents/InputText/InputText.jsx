import './InputText.scss';

const InputText = ({id, label='', value='', placeholder='', onChange, height='', width='', maxLength='', minLength='', error=''}) => {
    return (
        <div className={'input-text'}>
            <label htmlFor={id} className={'input-text__label'}>{label}</label>
            <input id={id}
                   onChange={onChange}
                   className={'input-text__input'}
                   type={'text'}
                   placeholder={placeholder}
                   maxLength={maxLength}
                   minLength={minLength}
                   defaultValue={value}/>
            <span className={'input-text__error'}>{error}</span>
            <style type={'text/css'}>{
                `#${id}{
                    height: ${height};
                    width: ${width};
                }`
            }</style>
        </div>
    )
}

export default InputText;