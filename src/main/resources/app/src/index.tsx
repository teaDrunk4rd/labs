import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

require('./axios');

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(<App/>, document.getElementById('root'));