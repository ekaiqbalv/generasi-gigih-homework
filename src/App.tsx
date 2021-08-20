import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux/stores';
import PrivateRoute from 'components/PrivateRoute';
import { HomePage, CreatePlaylistPage } from 'pages';
import './App.css';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
    </PersistGate>
  </Provider>
);

export default App;
