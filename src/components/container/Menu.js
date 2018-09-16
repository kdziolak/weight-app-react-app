import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import fire from '../../firebase';
import './Menu.css'

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
        <nav className='nav-wrapper blue'>
            <div class="container">
                <Link to="/" class="brand-logo">Weight App</Link>
                <Link to='#' data-target="nav" className='sidenav-trigger'><i className='material-icons'>menu</i></Link>
                <ul id="header-desktop" className="header-desktop right hide-on-med-and-down">
                    <li><Link to='/'className='sign-out blue' onClick={this.handleClick}>Sign out</Link></li>
                </ul>
                <ul id="nav" className="nav sidenav">
                    <li className='logo-container blue lighten-4'><div className="logo-icon"></div></li>
                    <li className='hide-on-large-only'><Link to='/' onClick={this.handleClick}>Sign out</Link></li>
                    <li><Link to='#'><i className='fa fa-weight'></i><span className='content-menu'>Waga</span></Link></li>
                </ul>
            </div>
           
        </nav>

      </div>
    )
  }
}
