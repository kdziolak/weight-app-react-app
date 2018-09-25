import React from 'react'

const ProfileCollectionItem = (props) => {
  return (
    <li className='collection-item'>
        <div className="collection-content">
            <label htmlFor={props.htmlFor} className='flow-text'>{props.collectionValue}: </label>
            <span id={props.htmlFor} className='personal-name flow-text'>{props.userValue}</span>
        </div>
        {props.editBool ? <form onSubmit={props.handleSubmit} id={props.formID} ><div className={`input-field col s12 ${props.formID}`}><input onChange={props.handleChange} id={props.inputID} type={props.inputType} /><label htmlFor={props.inputID}>New {props.collectionValue}</label></div></form> : null}
        <button onClick={props.handleClick} className='btn blue white-text far fa-edit secondary-content'></button>
    </li>
  )
}

export default ProfileCollectionItem
