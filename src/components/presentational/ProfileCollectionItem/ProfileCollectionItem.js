import React from 'react'

const ProfileCollectionItem = (props) => {
  const { htmlFor, collectionValue,userValue, unite, editBool, inputID, formID, handleChange, handleClick, handleSubmit, inputType, btnID} = props
  const form = collectionValue === 'Gender' ? (
    <form onSubmit={handleSubmit}>
        <p className="col s12">
            <label>
                <input id={inputID} onChange={handleChange}  className={btnID + ' radioMale'} name={collectionValue} type='radio' />
                <span>Male</span>
            </label>
        </p>
        <p className="col s12">
            <label>
                <input id={inputID} onChange={handleChange}  className={btnID + ' radioFemale'} name={collectionValue} type='radio' />
                <span>Female</span>
            </label>
        </p>
    </form>
  ) : (
  <form onSubmit={handleSubmit} >
    <div className={`input-field col s12 ${formID}`}>
      <input onChange={handleChange} id={inputID} autoFocus={true} type={inputType} />
      <label htmlFor={inputID}>New {collectionValue}</label>
    </div>
  </form>)
  return (
    <li className='collection-item'>
        <div className="collection-content">
            <label htmlFor={htmlFor} className='flow-text'>{collectionValue}: </label>
            <span id={htmlFor} className='personal-name flow-text'>{userValue} {unite ? unite : null}</span>
        </div>  
        {editBool ? form : null}
        <button onClick={handleClick} id={btnID} className='btn blue white-text far fa-edit secondary-content'></button>
    </li>
  )
}

export default ProfileCollectionItem
