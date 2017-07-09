import React from 'react';
import { render } from 'react-dom';
import 'reset-css/reset.css';
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig'; 
import AuthenticationWidget from './authentication/AuthenticationWidget';

firebase.initializeApp(firebaseConfig);

render(<AuthenticationWidget />, document.getElementById('root'));
