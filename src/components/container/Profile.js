import React, { Component } from 'react'
import ProfileCollection from '../presentational/ProfileCollection'
import './Profile.css'

class Profile extends Component {
  render() {
    return (
      <div className='profile'>
        <div className="container">
            <div className="row">
                <div className="col center-align">
                    <h3>My profile</h3>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <ProfileCollection />
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Profile
