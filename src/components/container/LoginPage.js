import React, {Component} from "react";
import './LoginPage.css'
import fire from '../../firebase'
import history from '../../history'

class LoginPage extends Component {

    state={
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = () => {
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) => {
                console.log(error.code)
            })
        history.push('/')
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
                                        <input id="email" type="email" id="email" className="email" value={this.state.email} onChange={this.handleChange}/>
                                        <label htmlFor="email">Email:</label>
                                    </div>
                                    <div className="input-field">
                                        <input id="password" type="password" id="password" className="password blue-text text-darken-4" value={this.state.password} onChange={this.handleChange}/>
                                        <label htmlFor="password">Password:</label>
                                    </div>
                                    <a href="#" className="right-align remind-password">Forget your password?</a>
                                    <button className="btn blue darken-3 waves-effect waves-light">Log In</button>
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