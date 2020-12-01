// import React from 'react';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

import {Component} from 'react';
import * as React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Router} from "./Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <ReactNotification/>
          <Route component={Router}/>
        </BrowserRouter>
    );
  }
}