import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const author = "Harsh Kevadia";

ReactDOM.render(<App author={author} />, document.getElementById('root'));
registerServiceWorker();
