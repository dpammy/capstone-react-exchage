import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './Components/Login'
import Converter from './Components/Converter';
import ForgetPassword from './Components/ForgetPassword';
import Register from './Components/Register';

export function App() {
  return (
    <div className="App">
    <Router>
      <Route path ="/" component = {Login} exact />
      <Route path ='/main' component = {Converter} exact /> 
       <Route path = '/forgotPassword' component = {ForgetPassword} exact />
       <Route path = '/register' component = {Register} exact />
      </Router>
    </div>
  );
}

export default App;
