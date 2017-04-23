import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import './index.css';
import Main from './components/main';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import store from './store';
import requireAuth from './components/auth/requireAuth';
import { AUTH_USER } from './actions/types';

const Welcome = () => (<h2>Welcome</h2>);
const Feature = () => (<h2>Feature page</h2>);

// check if user auth'd on load
const token = localStorage.getItem('token');
if(token){
  store.dispatch({type: AUTH_USER})
}

render(<Provider store={ store }>
  <Router>
    <div>
      <Route path="/" component={Main}/>
      <Route exact path="/" component={Welcome}/>
      <Route path="/signin" component={Signin}/>
      <Route path="/signup" component={Signup}/>
      <Route path='/signout' component={Signout}/>
      <Route path='/feature' component={requireAuth(Feature)} />
    </div>
  </Router>
</Provider>, document.getElementById('root'));
