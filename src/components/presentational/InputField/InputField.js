import React from 'react'

const InputField = props => {

    const onKeydownHandler = (e) => {
        e.keyCode === 9 ? props.showDatepicker(e) : null;
    }
    return (
    <div className="input-field">
        <input onFocus={props.showDatepicker} onKeyUp={props.showDatepicker ? onKeydownHandler : null} onChange={props.changeValue} min={`${props.minVal}`} type={props.type} id={props.id} className={props.classes}/>
        <label htmlFor={props.id}>{props.label}</label>
    </div>
    ) 
}

export default InputField;
