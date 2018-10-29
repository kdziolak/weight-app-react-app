import React, {Component} from "react";
import './SignUp.css'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { signUp } from '../../../store/actions/authActions'

class SignUp extends Component {

    state={
        email: '',
        password: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        return(
            <div className="signup-page container center-align">
                <div className="row">
                    <div className="col">
                        <h2 className="blue-text text-darken-3">Sign up to your best weight control app!</h2>
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
                                    <div class='right-align'>
                                        <Link to='/login'>Back to login page.</Link>
                                    </div>

                                    {   
                                        this.state.errorMessage ? <p className='error red lighten-1 white-text'>{this.state.errorMessage}</p> : null
                                    }

                                    <button className="btn blue darken-2 waves-effect waves-light">Sign Up</button>
                                </div>
                           </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (userData) => dispatch(signUp(userData))
    }
}

export default connect(null ,mapDispatchToProps)(SignUp);