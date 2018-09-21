import React from 'react'
import './ProfileCollection.css'

const ProfileCollection = () => {
  return (
    <ul className='profile-collection collection'>
        <li className='collection-item'>
            <label htmlFor='personal-name'>Name: </label>
            <span id='personal-name' className='personal-name'>Marek</span>
            
        </li>
        <li className='collection-item'>
            <label htmlFor='personal-name'>Age: </label>
            <span id='personal-name' className='personal-name'>Marek</span>
        </li>
        <li className='collection-item'>
            <label htmlFor='personal-name'>Gender: </label>
            <span id='personal-name' className='personal-name'>Marek</span>
        </li>
        <li className='collection-item'>
            <label htmlFor='personal-name'>Weight: </label>
            <span id='personal-name' className='personal-name'>Marek</span>
        </li>
        <li className='collection-item'>
            <label htmlFor='personal-name'>Growth: </label>
            <span id='personal-name' className='personal-name'>Marek</span>
        </li>
    </ul>
  )
}

export default ProfileCollection
