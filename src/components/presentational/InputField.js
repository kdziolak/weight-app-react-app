import React from 'react'

const InputField = props => {
    return (
    <div className="input-field">
        <input onFocus={props.getDatepicker} type={props.type} id={props.id} className={props.classes}/>
        <label for={props.id}>{props.label}</label>
    </div>
    ) 
}

export default InputField;
