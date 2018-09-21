import React, {Component} from "react";
import './LoginPage.css'
import fire from '../../firebase'

class LoginPage extends Component {

    state={
        email: '',
        password: '',
        errorMessage: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
            errorMessage: ''
        })
    }

    handleSubmit = () => {
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.loggedInChanged(true)
            })
            .catch((error) => {
                this.setState({
                    errorMessage: error.message
                })
            })
    }

    render() {
        return(
            <div className="login-page container center-align">
                <div className="row">
                    <div className="col">
                        <h2 className="blue-text text-darken-3">Login to your best weight control app!</h2>
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
                                        this.state.errorMessage ? <p className='error red lighten-1 white-text'>{this.state.errorMessage}</p> : null
                                    }
                                    <a href="#" className="right-align remind-password">Forget your password?</a>
                                    <button className="btn blue darken-2 waves-effect waves-light">Log In</button>
                                </div>
                           </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;