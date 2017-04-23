import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../header';

class MainComponent extends Component {
  render(){
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  }
};

const Main = connect(mapStateToProps, null)(MainComponent);
export default Main;
