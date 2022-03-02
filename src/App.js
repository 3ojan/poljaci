import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { Router, Route, Link, IndexRoute } from 'react-router'
import { Provider } from 'react-redux';
import store from "./store/index";
import { history } from './store';
import Home from './components/Home/Home';
import './main.scss';
import Edit from './components/Edit/Edit';

function App() {

  return (
    <Provider store={store}>
      <div className="main-wrapper">
        <Router history={history}>
          <Route exact path="/" component={Home} />
          <Route exact path="/edit" component={Edit} />
          {/* <Route path="/results" component={Results} /> */}
        </Router>
      </div>
    </Provider>
  );
}

export default App;
