import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { Router, Route, Link, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import store from "./store/index";
import { history } from './store';
import Home from './components/Home/Home';
import './main.scss';

function App() {

  return (
    <Provider store={store}>
      <div className="main-wrapper">
        <Router history={history}>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/quiz" component={Quiz} />
          <Route path="/results" component={Results} /> */}
        </Router>
      </div>
    </Provider>
  );
}

export default App;
