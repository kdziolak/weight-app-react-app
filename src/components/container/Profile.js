import React, { Component } from 'react'
import ProfileCollection from '../presentational/ProfileCollection'
import './Profile.css'

class Profile extends Component {

    state={
        editBool: {
            editUserGrowth: false
        },
        userValues: {
            valueGrowth: ''
        }
    }

    handleClick = (e) => {
        let edit = false;
        if(this.state.editBool.editUserGrowth) {
            edit = false;
            this.setState({
                editBool: {
                    editUserGrowth: edit
                }
            })
        } else{
            edit = true;
        this.setState({
            editBool: {
                editUserGrowth: edit
            }
        })
    }
        

    }

    handleSubmit = (e) => {
        
    }

    handleChange = (e) => {
        this.setState({
            userValues: {
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
