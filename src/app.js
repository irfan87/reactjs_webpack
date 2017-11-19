import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class TestReact extends Component {
    render(){
        return(
            <div>
                <h1>Hello, Developer! Welcome to React-land!</h1>
            </div>
        )
    }
}

ReactDOM.render(<TestReact />, document.getElementById('root'));