import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../../actions';
import { Redirect } from 'react-router-dom';

const renderField = ({input, label, type, meta: {touched, error}}) => {
  return (
    <fieldset>
      <label>{label}:</label>
      <input {...input}
        placeholder={label}
        type={type}
        name={label}/>
        {touched && error && <span className='error-text'>{error}</span>}
    </fieldset>
  )
}

class Signup extends Component {
  handleFormSubmit({email, password}){
    // console.log(email, password);
    this.props.signupUser({email, password});
  }
  render(){
    const {handleSubmit, errorMessage, authenticated} = this.props;
    // console.log('authenticated: ', authenticated);
    if(authenticated){
      return (<Redirect to='/feature'/>)
    }
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field type='text' name='email' component={renderField} label='email'/>
        <Field type='password' name='password' component={renderField} label='password'/>
        <Field type='password' name='passwordConfirm' component={renderField} label='passwordConfirm'/>
        {errorMessage && <span className='error-text'>{errorMessage}</span>}
        <br/>
        <button action='submit' type='submit'>Sign up</button>
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
    if(formProps.password !== formProps.passwordConfirm){
      errors.passwordConfirm = 'Password should match!';
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
  form:'signup',
  validate
})(Signup));
