import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import fire from '../../firebase';

export default class Menu extends Component {

    handleClick = () => {
        fire.auth().signOut()
            .then(() => {
                this.props.loggedInChanged(false)
            })
    }

  render() {
    return (
      <div className='menu'>
        <nav className='blue'>
            <div class="nav-wrapper container">
            <a href="#" class="brand-logo">Weight App</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><Link to='/'className='sign-out blue' onClick={this.handleClick}>Sign out</Link></li>
            </ul>
            </div>
        </nav>

      </div>
    )
  }
}
