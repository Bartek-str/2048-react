import React, { Component } from 'react';
import Home from "./components/Home";
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={ Home } />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;