import React, { Component } from 'react'
import ProfileCollection from '../presentational/ProfileCollection'
import { connect } from 'react-redux';
import { addUserData } from '../../store/actions/userActions'
import './Profile.css'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Profile extends Component {

    state={
        editBool: {
            editUserName: false,
            editUserAge: false,
            editUserGrowth: false,
            editUserWeight: false,
            editUserGender: false,
        },
        userValues: {
            tmpValue: '',
            valueName: 'Noname',
            valueGrowth: 0,
            valueWeight: 0,
            valueGender: false,
            valueAge: 0
        }
    }

    handleClick = (e) => {
        let stateTmp;
        let tmpValue = e.target.id
        let edit = !(this.state.editBool[e.target.id])

        if(this.state.userValues.tmpValue){
            stateTmp = !(this.state.editBool[this.state.userValues.tmpValue])
        }

        this.setState({
            editBool: {
                ...this.state.editBool,
                [this.state.userValues.tmpValue]: stateTmp,
                [e.target.id]: edit
            },
            userValues: {
                ...this.state.userValues,
                tmpValue: tmpValue
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let edit = false;
        this.setState({
            editBool: {
                ...this.state.editBool,
                [this.state.userValues.tmpValue]: edit
            }
        })
    }

    handleChange = (e) => {
        let value;
        value = e.target.value
        if(e.target.type === 'checkbox') value = e.target.checked; 
        this.setState({
            userValues: {
                ...this.state.userValues,
                [e.target.id] : value
            }
        })
    }

    saveProfile = () => {
        let { valueAge, valueName, valueWeight, valueGrowth } = this.state.userValues;

        if((valueAge >= 0) && (valueName !== 'Noname') && (valueWeight >= 0) && (valueGrowth >= 0) ) {
            this.props.addUserData(this.state.userValues)
        } else {
        }
    }
   

  render() {
      console.log(this.props.userProfile)
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
                         userProfile = {this.props.userProfile}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s12 m4 offset-m4 offset-s1">
                    <button onClick={this.saveProfile} className="btn-large blue waves-effect">Save your profile</button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserData: (user) => dispatch(addUserData(user))
    }
}
const mapStateToProps = (state) => {
    let userProfile = state.firestore.ordered.users ? state.firestore.ordered.users : [];
    return {
        userProfile
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(Profile)
