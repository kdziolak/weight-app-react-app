import React, { Component } from 'react'
import './Menu.css'
import M from 'materialize-css'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Profile from '../../../img/weightlifting.png'
import { signOut } from '../../../store/actions/authActions'


class Menu extends Component {

    handleClick = () => {
        this.props.signOut()
    }

    componentDidMount() {
        M.Sidenav.init(this.sidenav)
    }

    render() {
        const { userEmail } = this.props;
        return (
            <div className='menu navbar-fixed'>
                <nav className='nav-wrapper blue'>
                    <div className="container ">
                        <Link to="/" className="brand-logo">Weight App</Link>
                        <Link to="#" data-target="mobile-demo" className='sidenav-trigger'><i className='material-icons'>menu</i></Link>
                        <ul id="header-desktop" className="header-desktop right hide-on-med-and-down">
                            <li><p className="user-email cyan-text text-lighten-5">{userEmail ? userEmail : "I don't know who are you."}</p></li>
                            <li><NavLink to='/' className='sign-out blue' onClick={this.handleClick}>Sign out</NavLink></li>
                        </ul>
                        <ul className="sidenav nav grey lighten-5" id="mobile-demo" ref={sidenav => this.sidenav = sidenav}>
                            <li className='logo-container blue lighten-4'><div className="logo-icon"></div></li>
                            <li className='menu-item hide-on-large-only'><NavLink to='/' onClick={this.handleClick}>Sign out</NavLink></li>
                            <li className='menu-item'><NavLink to='/profile'><img src={Profile} alt="profile" className="menu-img" /><span className="content-menu">Your profile</span></NavLink></li>
                            <li className='menu-item'><NavLink to='#'><img className="menu-img" alt='weight' src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMxNSAzMTUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMxNSAzMTUiIHdpZHRoPSI2NHB4IiBoZWlnaHQ9IjY0cHgiPgogIDxnPgogICAgPHBhdGggZD0iTTI2NC4wMDcsMEg1MC45OTNDMjIuODc1LDAsMCwyMi44NzUsMCw1MC45OTN2MjEzLjAxNEMwLDI5Mi4xMjUsMjIuODc1LDMxNSw1MC45OTMsMzE1aDIxMy4wMTQgICBDMjkyLjEyNSwzMTUsMzE1LDI5Mi4xMjUsMzE1LDI2NC4wMDdWNTAuOTkzQzMxNSwyMi44NzUsMjkyLjEyNSwwLDI2NC4wMDcsMHogTTUwLjk5MywxNGgyMTMuMDE0ICAgQzI4NC40MDUsMTQsMzAxLDMwLjU5NSwzMDEsNTAuOTkzVjkxLjgzaC01Ni43NzNjLTI0LjA0NywwLTMwLjg1NSwxMC4wNjMtMzYuODYyLDE4Ljk0Yy02LjQyOCw5LjQ5OS0xMy4wNzQsMTkuMzIyLTQ5Ljg2NiwxOS4zMjIgICBjLTM2Ljc5MSwwLTQzLjQzOC05LjgyMi00OS44NjUtMTkuMzIyYy02LjAwNy04Ljg3OC0xMi44MTUtMTguOTQtMzYuODYzLTE4Ljk0SDE0VjUwLjk5M0MxNCwzMC41OTUsMzAuNTk1LDE0LDUwLjk5MywxNHogICAgTTI2NC4wMDcsMzAxSDUwLjk5M0MzMC41OTUsMzAxLDE0LDI4NC40MDUsMTQsMjY0LjAwN1YxMDUuODNoNTYuNzdjMTYuNjE3LDAsMjAuMDU5LDUuMDg3LDI1LjI2OSwxMi43ODYgICBjNy42OCwxMS4zNTEsMTcuMjM4LDI1LjQ3Nyw2MS40NiwyNS40NzdjNDQuMjIzLDAsNTMuNzgxLTE0LjEyNiw2MS40NjEtMjUuNDc3YzUuMjEtNy42OTksOC42NTEtMTIuNzg2LDI1LjI2Ny0xMi43ODZIMzAxdjE1OC4xNzcgICBDMzAxLDI4NC40MDUsMjg0LjQwNSwzMDEsMjY0LjAwNywzMDF6IiBmaWxsPSIjMDAwMDAwIi8+CiAgICA8cGF0aCBkPSJtMTI3LjA4Miw5Ny4xNDhjMS4yMTIsMi4yOTYgMy41OTUsMy43MzMgNi4xOTEsMy43MzNoMTcuMzM2YzAuMDA4LDAgMC4wMTYsMC4wMDIgMC4wMjMsMC4wMDIgMC4wMDksMCAwLjAxNy0wLjAwMiAwLjAyNS0wLjAwMmgzMS4wNjhjMi41OTcsMCA0Ljk4LTEuNDM4IDYuMTkxLTMuNzMzbDI0LjIyNi00NS45MTVjMS40MTgtMi42ODkgMC45MzktNS45ODYtMS4xODctOC4xNi0wLjY4LTAuNjk3LTE3LjEwNy0xNy4wNzMtNTMuNDU1LTE3LjA3M3MtNTIuNzc1LDE2LjM3Ni01My40NTcsMTcuMDczYy0yLjEyNiwyLjE3NC0yLjYwNSw1LjQ3MS0xLjE4Nyw4LjE2bDI0LjIyNiw0NS45MTV6bS0uODE2LTUxLjU1N2w0LjIsMTUuNjUzYzAuODM5LDMuMTI2IDMuNjY3LDUuMTg4IDYuNzU3LDUuMTg4IDAuNiwwIDEuMjExLTAuMDc4IDEuODE4LTAuMjQxIDMuNzMzLTEuMDAyIDUuOTQ4LTQuODQxIDQuOTQ2LTguNTc1bC00LjI5LTE1Ljk4N2MzLjI2Mi0wLjYzMiA2Ljg1NS0xLjExNyAxMC44MDMtMS4zODd2MTUuNzU4YzAsMy44NjYgMy4xMzQsNyA3LDcgMy44NjYsMCA3LTMuMTM0IDctN3YtMTUuNzU5YzMuOTQ3LDAuMjcgNy41NDIsMC43NTUgMTAuODAzLDEuMzg2bC00LjI5LDE1Ljk4OGMtMS4wMDIsMy43MzQgMS4yMTMsNy41NzMgNC45NDYsOC41NzUgMC42MDgsMC4xNjMgMS4yMTgsMC4yNDEgMS44MTgsMC4yNDEgMy4wOSwwIDUuOTE4LTIuMDYyIDYuNzU3LTUuMTg4bDQuMjAxLTE1LjY1NmMzLjU2NiwxLjQ3NiA2LjMyNCwzLjAxIDguMjk0LDQuMjg5bC0xOS41MjQsMzcuMDA1aC03LjUwMmwtNS45OTYtMTUuMTE0Yy0xLjA3Ni0yLjcxNS0zLjY3OC00LjQ3Ny02LjY0Ni00LjQxOC0yLjkyLDAuMDU5LTUuNDk2LDEuOTIzLTYuNDY1LDQuNjc4bC01LjIyMywxNC44NTRoLTguMTc5bC0xOS41MjItMzdjMS45NzYtMS4yODIgNC43MzMtMi44MTcgOC4yOTQtNC4yOXoiIGZpbGw9IiMwMDAwMDAiLz4KICA8L2c+Cjwvc3ZnPgo=" /><span className='content-menu'>Weight</span></NavLink></li>
                            <li className='menu-item'><NavLink to='#'><img className="menu-img" alt='centimeter' src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTE5MC4xNTksMTA2Ljg5NWgtMzguMjQyYy01LjYzMiwwLTEwLjE5OSw0LjU2Ni0xMC4xOTksMTAuMTk5czQuNTY3LDEwLjE5OSwxMC4xOTksMTAuMTk5aDM4LjI0MiAgICBjNS42MzIsMCwxMC4xOTktNC41NjYsMTAuMTk5LTEwLjE5OVMxOTUuNzkxLDEwNi44OTUsMTkwLjE1OSwxMDYuODk1eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwMS44MDEsMTc0LjY0N0gzNDIuMDc3di01Ni40MjljMC0yMi4xMjYtMTguOTcyLTQyLjEzOS01My40MTgtNTYuMzUyYy0zMS41ODMtMTMuMDMyLTczLjM1Ni0yMC4yMDgtMTE3LjYyLTIwLjIwOCAgICBjLTQ0LjI2NSwwLTg2LjAzNyw3LjE3Ni0xMTcuNjIxLDIwLjIwOEMxOC45NzIsNzYuMDc5LDAsOTYuMDkyLDAsMTE4LjIxOHYyNzUuNTY0YzAsMjIuMTI2LDE4Ljk3Miw0Mi4xMzksNTMuNDE3LDU2LjM1MiAgICBjMzEuNTg0LDEzLjAzMiw3My4zNTYsMjAuMjA4LDExNy42MiwyMC4yMDhoMzMwLjc2M2M1LjYzMiwwLDEwLjE5OS00LjU2NiwxMC4xOTktMTAuMTk5VjE4NC44NDYgICAgQzUxMiwxNzkuMjEzLDUwNy40MzMsMTc0LjY0Nyw1MDEuODAxLDE3NC42NDd6IE0xNzEuMDM4LDYyLjA1N2M4OC43NzUsMCwxNTAuNjQsMjkuNTk4LDE1MC42NCw1Ni4xNjEgICAgcy02MS44NjIsNTYuMTYtMTUwLjYzMiw1Ni4xNjFjLTAuMDAzLDAtMC4wMDUsMC0wLjAwOCwwcy0wLjAwNiwwLTAuMDA5LDBjLTg4Ljc2OS0wLjAwMS0xNTAuNjMtMjkuNTk4LTE1MC42My01Ni4xNjEgICAgUzgyLjI2NCw2Mi4wNTcsMTcxLjAzOCw2Mi4wNTd6IE0zMjEuNjc5LDE1NS41MTF2MTkuMTM1SDI4OC40N2MwLjA2Mi0wLjAyNiwwLjEyNy0wLjA1LDAuMTg5LTAuMDc2ICAgIEMzMDIuMDkyLDE2OS4wMjcsMzEzLjE1OSwxNjIuNiwzMjEuNjc5LDE1NS41MTF6IE00OTEuNjAyLDQ0OS45NDJoLTY2Ljg0OVYyODMuNTM4YzAtNS42MzMtNC41NjctMTAuMTk5LTEwLjE5OS0xMC4xOTkgICAgcy0xMC4xOTksNC41NjYtMTAuMTk5LDEwLjE5OXYxNjYuNDA1SDI2Mi4xMTZ2LTIwOS4xOWMwLTUuNjMzLTQuNTY3LTEwLjE5OS0xMC4xOTktMTAuMTk5Yy01LjYzMiwwLTEwLjE5OSw0LjU2Ni0xMC4xOTksMTAuMTk5ICAgIHYyMDkuMTloLTcwLjY4Yy0yNS41MDUsMC00OC43ODItMi40NDctNjkuMDE2LTYuNTU5VjI0MC43NTNjMC01LjYzMy00LjU2Ny0xMC4xOTktMTAuMTk5LTEwLjE5OSAgICBjLTUuNjMyLDAtMTAuMTk5LDQuNTY2LTEwLjE5OSwxMC4xOTl2MTk3LjY0N2MtMzguMTYzLTExLjA1NC02MS4yMjUtMjguNDAyLTYxLjIyNS00NC42MTh2LTIzOC4yNyAgICBjOC41MTgsNy4wODcsMTkuNTg2LDEzLjUxNSwzMy4wMTksMTkuMDU4YzMxLjAyNywxMi44MDIsNzEuODg3LDE5Ljk0OCwxMTUuMjgzLDIwLjE5NWwzMjIuOTAyLDAuMjc5VjQ0OS45NDJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDE0LjU1NCwyMzAuNTU0Yy01LjYzMiwwLTEwLjE5OSw0LjU2Ni0xMC4xOTksMTAuMTk5djcuMDg3YzAsNS42MzMsNC41NjcsMTAuMTk5LDEwLjE5OSwxMC4xOTkgICAgczEwLjE5OS00LjU2NiwxMC4xOTktMTAuMTk5di03LjA4N0M0MjQuNzUzLDIzNS4xMiw0MjAuMTg2LDIzMC41NTQsNDE0LjU1NCwyMzAuNTU0eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /><span className='content-menu'>Sizes</span></NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}
const mapStateToProps = state => {
    return {
        userEmail: state.firebase.profile.email
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)