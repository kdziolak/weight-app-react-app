import React from 'react'
import './ProfileCollection.css'
import './ProfileCollectionItem'
import ProfileCollectionItem from './ProfileCollectionItem';

const ProfileCollection = (props) => {

    const {handleClick, handleChange, handleSubmit, } = props;

    console.log(props.userProfile[0])
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
            userValue={((props.userValues.valueName === "Noname" && props.userProfile[0]) ||  props.userValues.valueName === '') ? props.userProfile[0].valueName : props.userValues.valueName}
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
            userValue={((props.userValues.valueAge === 0 && props.userProfile[0]) ||  props.userValues.valueAge === '') ? props.userProfile[0].valueAge : props.userValues.valueAge}
        />
        <ProfileCollectionItem
            htmlFor='personal-gender'
            collectionValue='Gender'
            userValue={props.userValues.valueGender ? 'Male' : 'Female'}
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
            userValue={props.userValues.valueGrowth}
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
            userValue={props.userValues.valueWeight}
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
