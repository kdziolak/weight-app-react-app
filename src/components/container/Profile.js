import React, { Component } from 'react'
import ProfileCollection from '../presentational/ProfileCollection'
import './Profile.css'

class Profile extends Component {

    state={
        editBool: {
            editUserGrowth: false,
            editUserWeight: false
        },
        userValues: {
            tmpValue: '',
            valueGrowth: '',
            valueWeight: ''
        }
    }

    handleClick = (e) => {
        let edit = !(this.state.editBool[e.target.id])
        this.setState({
            editBool: {
                [e.target.id]: edit,
                tmpValue: e.target.id
            }
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
        let edit = false;
        this.setState({
            editBool: {
                ...this.state.editBool,
                [this.state.tmpValue]: edit
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            userValues: {
                ...this.state.userValues,
                [e.target.id] : e.target.value
            }
        })
    }

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
                    <ProfileCollection
                         handleClick={this.handleClick}
                         handleSubmit={this.handleSubmit}
                         handleChange={this.handleChange}
                         editBool={this.state.editBool}
                         userValues={this.state.userValues}
                    />
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Profile
