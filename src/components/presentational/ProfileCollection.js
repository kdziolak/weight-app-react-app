import React from 'react'
import './ProfileCollection.css'

const ProfileCollection = (props) => {

  return (
    <ul className='profile-collection collection'>
        <li className='collection-item'>
            <div className="collection-content">
                <label htmlFor='personal-name'>Name: </label>
                <span id='personal-name' className='personal-name'>Marek</span>
            </div>
        </li>
        <li className='collection-item'>
        <div className="collection-content">
                <label htmlFor='personal-age'>Age: </label>
                <span id='personal-age' className='personal-name'>Marek</span>
            </div>
        </li>
        <li className='collection-item'>
        <div className="collection-content">
                <label htmlFor='personal-gender'>Gender: </label>
                <span id='personal-gender' className='personal-name'>Marek</span>
            </div>
        </li>
        <li className='collection-item'>
        <div className="collection-content">
                <label htmlFor='personal-growth'>Growth: </label>
                <span id='personal-growth' className='personal-name'>{props.userValues.valueGrowth}</span>
            </div>
            {props.editBool.editUserGrowth ? <form onSubmit={props.handleSubmit} className='input-field'><input onChange={props.handleChange} id='valueGrowth' type='text' /><label htmlFor='valueGrowth'>New growth</label></form> : null}
            <button onClick={props.handleClick} id='btn-growth' className='btn blue white-text far fa-edit secondary-content'></button>
        </li>
        <li className='collection-item'>
            <div className="collection-content">
                <label htmlFor='personal-weight'>Weight: </label>
                <span id='personal-weight' className='personal-name'>Marek</span>
            </div>
            <button id='btn-weight' className='btn blue white-text far fa-edit secondary-content'></button>
        </li>
    </ul>
  )
}

export default ProfileCollection
