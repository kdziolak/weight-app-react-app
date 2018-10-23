import React from 'react'
import './ProfileCollection.css'
import './ProfileCollectionItem'
import ProfileCollectionItem from './ProfileCollectionItem';

const ProfileCollection = (props) => {

    const {handleClick, handleChange, handleSubmit, } = props;
  return (
    <ul className='profile-collection collection'>
        <ProfileCollectionItem
            htmlFor='personal-name'
            collectionValue='Name'
            btnID='editUserName'
            inputID='valueName'
            inputType='text'
            editBool={props.editBool.editUserName}
            handleClick={handleClick}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            userValue={((props.userValues.valueName === "Noname"  ||  props.userValues.valueName === '') && props.userProfile) ? props.userProfile.valueName : props.userValues.valueName}
        />
        <ProfileCollectionItem
            htmlFor='personal-age'
            collectionValue='Age'
            btnID='editUserAge'
            inputID='valueAge'
            inputType='number'
            editBool={props.editBool.editUserAge}
            handleClick={handleClick}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            userValue={((props.userValues.valueAge === 0  ||  props.userValues.valueAge === '') && props.userProfile) ? props.userProfile.valueAge : props.userValues.valueAge}
        />
        <ProfileCollectionItem
            htmlFor='personal-gender'
            collectionValue='Gender'
            userValue={((props.userValues.valueGender === "Female"  ||  props.userValues.valueGender === '') && props.userProfile) ? (props.userProfile.valueGender ? 'Male' : 'Female') : (props.userValues.valueGender ? 'Male' : 'Female') }
            btnID='editUserGender'
            inputID='valueGender'
            inputType='checkbox'
            editBool={props.editBool.editUserGender}
            handleClick={handleClick}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
        <ProfileCollectionItem
            htmlFor='personal-growth'
            collectionValue='Growth'
            userValue={((props.userValues.valueGrowth === 0 || props.userValues.valueGrowth === '') &&  props.userProfile ) ? props.userProfile.valueGrowth : props.userValues.valueGrowth}
            btnID='editUserGrowth'
            inputID='valueGrowth'
            inputType='number'
            unite='cm'
            editBool={props.editBool.editUserGrowth}
            handleClick={handleClick}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
        <ProfileCollectionItem
            htmlFor='personal-weight'
            collectionValue='Weight'
            userValue={((props.userValues.valueWeight === 0 || props.userValues.valueWeight === '') && props.userProfile ) ? props.userProfile.valueWeight : props.userValues.valueWeight}
            btnID='editUserWeight'
            inputID='valueWeight'
            inputType='number'
            unite='kg'
            editBool={props.editBool.editUserWeight}
            handleClick={handleClick}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
    </ul>
  )
}

export default ProfileCollection
