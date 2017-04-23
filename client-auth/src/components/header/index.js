import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './style.css';

class Header extends Component {
  constructor(props){
    super(props);
    this.renderLinks = this.renderLinks.bind(this);
  }
  renderLinks(){
    const {authenticated} = this.props;
    if(authenticated){
      return [
        <li key='signout'><Link to="/signout">signout</Link></li>,
        <li key='feature'><Link to="/feature">feature</Link></li>
      ]
    }
    else {
      return [
        <li key='signin'><Link to="/signin">signin</Link></li>,
        <li key='signup'><Link to="/signup">signup</Link></li>
      ]
    }
  }
  render(){
    return (
      <div className='header-wrap'>
        <ul>
          <li><Link to="/">home</Link></li>
          {this.renderLinks()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  }
};

export default connect(mapStateToProps, null)(Header);
