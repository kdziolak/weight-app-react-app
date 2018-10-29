import React, {Component} from "react";
import './LoginPage.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'

import HeaderTitle from '../presentational/HeaderTitle'
import Button from '../presentational/Button'

class LoginPage extends Component {

    state={
        email: '',
        password: '',
        loading: false
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = () => {
        this.setState({
            loading: true
        })
        this.props.signIn(this.state)
    }

    render() {
        if(this.state.loading){
            return(
            <div className="login-page container spiner-login">
                <div className="row">
                    <div className="col s12 center-align">
                        <div class="preloader-wrapper big active">
                            <div class="spinner-layer spinner-blue-only">
                                <div class="circle-clipper left">
                                     <div class="circle"></div>
                                </div>
                                <div class="gap-patch">
                                    <div class="circle"></div>
                                </div>
                                <div class="circle-clipper right">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            );
        }
        
        return(
            <div className="login-page container center-align">
                <div className="row">
                    <div className="col s12 center-align">
                        <HeaderTitle headerNumber={2} classes='blue-text text-darken-3' content='Login to your best weight control app!'/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s10 l8 offset-s1 offset-l2">
                        <form className="blue lighten-5 z-depth-2" onSubmit={this.handleSubmit}>
                           <div className="row">
                                <div className="col s12">
                                    <div className="input-field">
                                        <input id="email" type="email" className="email" value={this.state.email} onChange={this.handleChange}/>
                                        <label htmlFor="email">Email:</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="password" type="password" className="password blue-text text-darken-4" value={this.state.password} onChange={this.handleChange}/>
                                        <label htmlFor="password">Password:</label>
                                    </div>
                                    {
                                        // this.state.errorMessage ? <p className='error red lighten-1 white-text'>{this.state.errorMessage}</p> : null
                                    }
                                    <div className="login-links">
                                        <Link to="/" className="right-align remind-password">Forget your password?</Link>
                                        <Link to="/signup" className="right-align">Create account.</Link>
                                    </div>
                                    <Button classes="btn btn-large blue darken-2 waves-effect waves-light" content='Log In'/>
                                </div>
                           </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (loginData) => dispatch(signIn(loginData))
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);