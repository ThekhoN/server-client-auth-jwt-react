import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const requireAuth = ComposedComponent => {
  class Authentication extends Component {
    render() {
      if(!this.props.authenticated){
        return <Redirect to='/' />
      }
      else {
        return <ComposedComponent {...this.props} />
      }
    }
  }
  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    }
  }
  return connect(mapStateToProps, null)(Authentication);
}

export default requireAuth;
