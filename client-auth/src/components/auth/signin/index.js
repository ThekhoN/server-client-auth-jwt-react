import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../../actions';
import { Redirect } from 'react-router-dom';

const renderField = ({input, label, type, meta: {touched, error}}) => {
  return (
    <fieldset>
      <input {...input}
        name={label}
        placeholder={label}
        type={type}/>
        {touched && error && <span className='error-text'>{error}</span>}
    </fieldset>

  )
}

class Signin extends Component {
  handleFormSubmit({email, password}){
    // console.log(email, password);
    this.props.signinUser({email, password});
  }
  render(){
    const {handleSubmit, errorMessage, authenticated} = this.props;
    if(authenticated){
      return (<Redirect to='/feature'/>)
    }
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field type='text' name='email' component={renderField} label='email'/>
        <Field type='password' name='password' component={renderField} label='password'/>
        {errorMessage && <span className='error-text'>{errorMessage}</span>}
        <br/>
        <button type='submit'>Sign in</button>
      </form>
    )
  }
}

const validate = (formProps) => {
  const errors = {};
  if(!formProps.email){
    errors.email = 'Required';
  }
  if(!formProps.password){
    errors.password = 'Required';
  }

  return errors;
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signin',
  validate
})(Signin));
