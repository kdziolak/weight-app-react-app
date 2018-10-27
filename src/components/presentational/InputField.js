import React from 'react'

const InputField = props => {
    <div className="input-field">
        <input type={props.type} id={props.id} className={props.classes}/>
        <label for={props.id}>{props.label}</label>
    </div>
}

export default InputField;
