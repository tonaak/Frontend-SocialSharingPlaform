import { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/troke-logo.png';

class TopBar extends Component {
    render() {
        return (
            <div className="bg-white shadow-sm mb-2">
                <div className="container">
                    <nav className="navbar navbar-light navbar-expand">
                        <Link to="/">
                            <img src={logo} width="150" alt="troke" />
                        </Link>
                        <ul className="nav navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

export default TopBar;