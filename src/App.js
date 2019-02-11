import React from 'react';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import combineReducers from "store/reducers";
import RootComponent from "./RootComponent";
import './App.css';

const App = () => {

    const store = createStore(combineReducers);

    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={RootComponent} />
            </Router>
        </Provider>
    );
};

export default App;
