import React from 'react'
import './ProfileCollection.css'
import './ProfileCollectionItem'
import ProfileCollectionItem from './ProfileCollectionItem';

const ProfileCollection = (props) => {

  return (
    <ul className='profile-collection collection'>
        <ProfileCollectionItem
            htmlFor='personal-name'
            collectionValue='Name'
            userValue={props.userValues.valueName}
            formID='editUserName'
            inputID='valueName'
            inputType='text'
            editBool={props.editBool.editUserName}
            handleClick={props.handleClick}
            handleSubmit={props.handleSubmit}
            handleChange={props.handleChange}
        />
        <li className='collection-item'>
        <div className="collection-content">
                <label htmlFor='personal-age' className='flow-text'>Age: </label>
                <span id='personal-age' className='personal-name flow-text'>Marek</span>
            </div>
        </li>
        <li className='collection-item'>
            <div className="collection-content">
                <label htmlFor='personal-gender' className='flow-text'>Gender: </label>
                <span id='personal-gender' className='personal-name flow-text'>{props.userValues.valueGender ? 'Male' : 'Female'}</span>
            </div>
            {props.editBool.editUserGender ? (
                <form onSubmit={props.handleSubmit}>
                    <p className="col s6 ">
                        <label>
                            <input id='valueGender' name='gender' type='radio' />
                            <span>Male</span>
                        </label>
                    </p>
                    <p className="col s6 ">
                        <label>
                            <input id='valueGender' name='gender' type='radio' />
                            <span>Female</span>
                        </label>
                    </p>
                </form>) : null}
            <button onClick={props.handleClick} id='editUserWeight' className='btn blue white-text far fa-edit secondary-content'></button>
        </li>
        <li className='collection-item'>
        <div className="collection-content">
                <label htmlFor='personal-growth' className='flow-text'>Growth: </label>
                <span id='personal-growth' className='personal-name flow-text'>{props.userValues.valueGrowth} cm</span>
            </div>
            {props.editBool.editUserGrowth ? <form onSubmit={props.handleSubmit}><div className="input-field col s12 "><input onChange={props.handleChange} id='valueGrowth' type='number' /><label htmlFor='valueGrowth'>New growth</label></div></form> : null}
            <button onClick={props.handleClick} id='editUserGrowth' className='btn blue white-text far fa-edit secondary-content'></button>
        </li>
        <li className='collection-item'>
            <div className="collection-content">
                <label htmlFor='personal-weight' className='flow-text'>Weight: </label>
                <span id='personal-weight' className='personal-name flow-text'>{props.userValues.valueWeight} kg</span>
            </div>
            {props.editBool.editUserWeight ? <form onSubmit={props.handleSubmit}><div className="input-field col s12 "><input onChange={props.handleChange} id='valueWeight' type='number' /><label htmlFor='valueWeight'>New weight</label></div></form> : null}
            <button onClick={props.handleClick} id='editUserWeight' className='btn blue white-text far fa-edit secondary-content'></button>
        </li>
    </ul>
  )
}

export default ProfileCollection
