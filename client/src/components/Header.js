import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href='/auth/google'>Login with Google</a>;
      default:
        return <a href='/api/logout'>Logout</a>;
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'>
            Emaily
          </Link>
          <ul className='right' href='/auth/google'>
            <li>{this.renderContent()}</li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
