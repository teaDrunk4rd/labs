import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);

        axios.get('/api/disciplines').then(response => {
            debugger
        });
    }

    render() {
        return (
            <div>privet</div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));