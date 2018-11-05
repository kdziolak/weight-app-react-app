import React from 'react'


const InputField = props => {


    const onKeydownHandler = e => {
        if(e.keyCode === 9 ){
            e.preventDefault();
        }
    }
    return (
    <div className="input-field">
        <input onKeyDown={onKeydownHandler} value={props.value} onFocus={props.showDatepicker} onChange={props.changeValue} min={`${props.minVal}`} type={props.type} id={props.id} className={props.classes}/>
        <label htmlFor={props.id}>{props.label}</label>
    </div>
    ) 
}

export default InputField;
