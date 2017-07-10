import React from 'react';
import { render } from 'react-dom';
import 'reset-css/reset.css';
import * as firebase from 'firebase';
import firebaseConfig from './firebaseConfig'; 
import App from './app/App';

firebase.initializeApp(firebaseConfig);

render(<App />, document.getElementById('root'));
