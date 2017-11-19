const css = require('./app.scss');
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class TestReact extends Component {
    render(){
        return(
            <div>
                <h2>Houston, ReactJS is landing.. I repeat, ReactJS is landing! Please Standby..</h2>
            </div>
        )
    }
}

ReactDOM.render(<TestReact />, document.getElementById('root'));