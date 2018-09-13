import React, {Component} from "react";
import './LoginPage.css'

class LoginPage extends Component {
    render() {
        return(
            <div className="login-page container center-align">
                <div className="row">
                    <div className="col">
                        <h2 className="blue-text text-darken-3">Login to your best weight control app!</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col s10 l8 offset-s1 offset-l2 center-align">
                        <form className="blue lighten-5 z-depth-2">
                           <div className="row">
                                <div className="col s12">
                                    <div className="input-field">
                                        <input type="email" id="email" className="email"/>
                                        <label htmlFor="email">Email:</label>
                                    </div>
                                    <div className="input-field">
                                        <input type="password" id="password" className="password blue-text text-darken-4"/>
                                        <label htmlFor="password">Password:</label>
                                    </div>
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