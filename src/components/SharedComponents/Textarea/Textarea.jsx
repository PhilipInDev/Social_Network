import './Textarea.scss'


const Textarea = ({id, label='', value='', placeholder='', onChange, minHeight='', maxHeight='', width='', disabled=false, error=''}) => {
    return (
        <div className={'textarea__box'}>
            <label htmlFor={id} className={'textarea__label'}>{label}</label>
            <textarea  id={id}
                       onChange={onChange}
                       className={'textarea__textarea'}
                       placeholder={placeholder}
                       disabled={disabled}
                       defaultValue={value}/>
            <span className={'textarea__error'}>{error}</span>
            <style
                type={'text/css'}>{
                    `#${id}{
                        min-height: ${minHeight};
                        max-height: ${maxHeight};
                        width: ${width};
                    }`
                }</style>
        </div>
    )
}

export default Textarea;