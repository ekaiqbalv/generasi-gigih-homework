import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from 'redux/stores';
import PrivateRoute from 'components/PrivateRoute';
import HomePage from 'pages/home';
import CreatePlaylistPage from 'pages/create-playlist';
import './App.css';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Router>
        <Switch>
          <PrivateRoute path="/create-playlist">
            <CreatePlaylistPage />
          </PrivateRoute>
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  </Provider>
);

export default App;
