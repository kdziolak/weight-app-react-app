import React, { Component } from 'react'
import ProfileCollection from '../presentational/ProfileCollection'
import { connect } from 'react-redux';
import { addUserData, editUserProfile } from '../../store/actions/userActions'
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
        },
        message: ''
    }

    handleClick = (e) => {
        let stateTmp;
        let tmpValue = e.target.id
        let edit = !(this.state.editBool[e.target.id])

        if(this.state.userValues.tmpValue){
            stateTmp = ''
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
            },
            message: ''
        })
    }

    saveProfile = () => {
        let { valueAge, valueName, valueWeight, valueGrowth } = this.state.userValues;
        if((valueAge !== 0) && (valueName !== 'Noname') && (valueWeight !== 0) && (valueGrowth !== 0) ) {
            this.props.addUserData(this.state.userValues)
            this.setState({
                message:'Profile has been saved.'
            })
        } else {
            this.setState({
                message: 'Check all values are correct.'
            })
        }
    }

    editProfile = () => {
        this.props.editUserProfile(this.state.userValues, this.props.userAuthID)
    }
   

  render() {
      let renderProfile = this.props.usersProfile.map((userProfile, i) => {
          if(userProfile.userID === this.props.userAuthID){
              return (
                <ProfileCollection
                    key={i}
                    handleClick={this.handleClick}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    editBool={this.state.editBool}
                    userValues={this.state.userValues}
                    userProfile = {userProfile}
                />  
              )
          }
          return null;
      });
      
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
                    { renderProfile[0] !== null ? renderProfile : (
                         <ProfileCollection
                            
                            handleClick={this.handleClick}
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            editBool={this.state.editBool}
                            userValues={this.state.userValues}
                           
                        />  
                    )}
                </div>
            </div>
            <div className="row">
                
                <div className="col s12 m4 offset-m4 offset-s1">
                {renderProfile[0] === null ? 
                    <button onClick={this.saveProfile}className="btn-large blue waves-effect">Save your profile</button> :
                    <button onClick={this.editProfile} className="btn-large blue waves-effect">Edit your profile</button> 
                }
                    
                </div>
                <div className="col s12">
                    {
                         this.state.message ? <p className='card-panel red lighten-1 white-text center flow-text'>{this.state.message}</p> : null
                    }
                </div>
                   
            </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserData: (user) => dispatch(addUserData(user)),
        editUserProfile: (user, userID) => dispatch(editUserProfile(user, userID))
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    let usersProfile = state.firestore.ordered.users ? state.firestore.ordered.users : [];
    return {
        usersProfile,
        userAuthID: state.firebase.auth.uid
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' }
    ])
)(Profile)
